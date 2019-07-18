import Login from './pages/login'
import history from './util/history'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Router, Switch, Route } from 'react-router-dom'
import './App.css'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import AuthRoute from './util/AuthRoute'
import home from './pages/home'
import listaDeAlunos from './pages/listaDeAlunos'
import addAluno from './pages/addAluno'
import aluno from './pages/aluno'
import jwtDecode from 'jwt-decode'
import dadosDesempenho from './pages/dadosDesempenho'
import blockAluno from './pages/blockAluno'
import axios from 'axios'

axios.defaults.baseURL = 'https://us-central1-personalclub-23861.cloudfunctions.net/api'

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#eeeeee',
			main: '#333',
			dark: '#9e9e9e',
			contrastText: '#fff'
		},
		secondary: {
			light: '#800000',
			main: '#f00',
			dark: '#ff9696',
			contrastText: '#fff'
		}
	},
	typography: {
		useNextVariants: true
	},
	snack: {
		backgroundColor: 'green'
	}
})

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			authenticated: false
		}
	}

	handleLogin = () => {
		this.setState({
			authenticated: true
		})
	}

	componentWillMount() {
		const token = localStorage.FBidToken
		if (token) {
			const decodedToken = jwtDecode(token)
			if (decodedToken.exp * 1000 < Date.now()) {
				localStorage.removeItem('FBidToken')
				this.setState({
					authenticated: false
				})
				history.push('/')
			} else {
				this.setState({
					authenticated: true
				})
			}
		}
	}

	render() {
		const { authenticated } = this.state
		return (
			<MuiThemeProvider theme={theme}>
				<div className='App'>
					<Router history={history}>
						<div className='container'>
							<Switch>
								<Route
									exact
									path='/'
									render={props => <Login {...props} login={this.handleLogin} />}
								/>
								<AuthRoute exact path='/home' component={home} authenticated={authenticated} />
								<AuthRoute
									exact
									path='/listaDeAlunos'
									component={listaDeAlunos}
									authenticated={authenticated}
								/>
								<AuthRoute exact path='/aluno' component={aluno} authenticated={authenticated} />
								<AuthRoute
									exact
									path='/dadosDesempenho'
									component={dadosDesempenho}
									authenticated={authenticated}
								/>
								<AuthRoute
									exact
									path='/blockAluno'
									component={blockAluno}
									authenticated={authenticated}
								/>
								<AuthRoute
									exact
									path='/addAluno'
									component={addAluno}
									authenticated={authenticated}
								/>
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		)
	}
}

App.props = {
	classes: PropTypes.object.isRequired
}

export default App
