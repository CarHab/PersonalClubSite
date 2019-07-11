import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import logo from '../images/logo.png'
import { auth } from '../pages/login'
import history from '../util/history'

class Navbar extends Component {
  signOut = () => {
    localStorage.removeItem('FBidToken')
    history.push('/')
    auth.authenticated = false
  }

  render() {
    return (
      <AppBar>
        <Toolbar style={{ justifyContent: !this.props.buttons ? 'center' : 'space-between' }}>
          {this.props.buttons && (
            <Button color="inherit" component={Link} to={this.props.link1}>
              Início
            </Button>
          )}
          <img src={logo} height={50} alt="logo" />
          {this.props.buttons && (
            <Button
              onClick={this.signOut}
              color="inherit"
              component={Link}
              to={this.props.link2}
            >
              Sair
            </Button>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar
