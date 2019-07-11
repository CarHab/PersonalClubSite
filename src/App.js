import login, { auth } from './pages/login'
import React, { Component } from 'react'
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
import dadosDesempenho from './pages/dadosDesempenho';
import blockAluno from './pages/blockAluno';
import history from './util/history'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#eeeeee',
      main: '#333',
      dark: '#9e9e9e',
      contrastText: '#fff',
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

const token = localStorage.FBidToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('FBidToken')
    history.push('/')
    auth.authenticated = false
  } else {
    auth.authenticated = true
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router  history={history}>
            
            <div className="container">
              <Switch>
                <Route exact path="/" component={login} />
                <AuthRoute
                  exact
                  path="/home"
                  component={home}
                  authenticated={auth.authenticated}
                />
                <AuthRoute
                  exact
                  path="/listaDeAlunos"
                  component={listaDeAlunos}
                  authenticated={auth.authenticated}
                />
                <AuthRoute
                  exact
                  path="/aluno"
                  component={aluno}
                  authenticated={auth.authenticated}
                />
                <AuthRoute
                  exact
                  path="/dadosDesempenho"
                  component={dadosDesempenho}
                  authenticated={auth.authenticated}
                />
                <AuthRoute
                  exact
                  path="/blockAluno"
                  component={blockAluno}
                  authenticated={auth.authenticated}
                />
                <AuthRoute
                  exact
                  path="/addAluno"
                  component={addAluno}
                  authenticated={auth.authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
