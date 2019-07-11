import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Navbar from '../components/Navbar'
import history from '../util/history'

const styles = {
  form: {
    textAlign: 'center'
  },
  title: {
    color: '#333',
    margin: '20px auto 20px auto'
  },
  textField: {
    margin: '5px auto 5px auto'
  },
  button: {
    marginTop: 15,
    position: 'relative'
  },
  customError: {
    color: 'red',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
}

export let auth = {
  authenticated: false
}

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios
      .post('', userData)
      .then(res => {
        this.setState({
          loading: false
        })
        const FBidToken = `Bearer ${res.data.token}`
        localStorage.setItem('FBidToken', FBidToken)
        axios.defaults.headers.common['Authorization'] = FBidToken
        auth.authenticated = true
        history.push('/home')
      })
      .catch(err => {
        auth.authenticated = false
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const { classes } = this.props
    const { errors, loading } = this.state
    return (
      <div>
        <Navbar buttons={false} />
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Typography variant="h3" className={classes.title}>
              Área admistrativa
            </Typography>
            <form noValidate onSubmit={this.handleSubmit} autoComplete="off">
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                variant="filled"
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                variant="filled"
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Entrar
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    )
  }
}

login.props = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
