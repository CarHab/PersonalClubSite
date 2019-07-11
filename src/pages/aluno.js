import React, { Component } from 'react'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputMask from 'react-input-mask'
import history from '../util/history'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Navbar from '../components/Navbar'

const styles = {
  title: {
    textAlign: 'center',
    color: '#333',
    margin: '20px auto 20px auto'
  },
  success: {
    color: 'green',
    fontSize: '1.5rem',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  },
  close: {
    padding: 15
  }
}

class aluno extends Component {
  normalizeBoolean = value => {
    if (value === 'Masculino') return true
    if (value === 'Feminino') return false
    return value
  }

  getData = () => {
    const config = {
      headers: {
        Authorization: localStorage.FBidToken
      }
    }

    const email = {
      email: history.location.state.user[5]
    }

    axios
      .post('/aluno', email, config)
      .then(res => {
        console.log(res.data)
        this.setState({
          nome: res.data.nome,
          matricula: res.data.matricula,
          cpf: res.data.cpf,
          sexo: res.data.sexo,
          nascimento: res.data.nascimento,
          email: res.data.email,
          telefone: res.data.telefone,
          pais: res.data.pais,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  }

  componentDidMount() {
    this.getData()
  }

  constructor() {
    super()
    this.state = {
      nome: '',
      matricula: '',
      sexo: '',
      cpf: '',
      nascimento: '',
      email: '',
      telefone: '',
      pais: '',
      errors: {},
      id: null,
      message: {},
      snackOpen: false,
      loading: true,
      loadingPost: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      loadingPost: true
    })
    const config = {
      headers: {
        Authorization: localStorage.FBidToken
      }
    }
    const userData = {
      nome: this.state.nome,
      matricula: this.state.matricula,
      sexo: this.state.sexo,
      cpf: this.state.cpf.replace(/\./g, '').replace('-', ''),
      nascimento: this.state.nascimento,
      email: this.state.email,
      telefone: this.state.telefone,
      pais: this.state.pais
    }
    axios
      .post('/editarAluno', userData, config)
      .then(res => {
        this.setState({
          message: res.data,
          loadingPost: false,
          snackOpen: true
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errors: err.response.data,
          loadingPost: false
        })
      })
  }

  handleClick = () => {
    history.push({
      pathname: '/dadosDesempenho',
      state: {
        email: history.location.state.user[5],
        nome: history.location.state.user[0]
      }
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      snackOpen: false
    })
  }

  render() {
    const { classes } = this.props
    const { errors, message, loading, snackOpen, loadingPost } = this.state
    return (
      <div>
        <Navbar buttons={true} link1={'/home'} link2={'/'} />
        <Fade in={true} timeout={{ enter: 250 }}>
          <div>
            <Typography variant="h3" className={classes.title}>
              Editar Aluno
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                {loading && <Loader size={100} height={'28vh'} />}
                {!loading && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="nome"
                      name="nome"
                      type="text"
                      label="Nome"
                      helperText={errors.nome}
                      error={errors.nome ? true : false}
                      value={this.state.nome}
                      onChange={this.handleChange}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="matricula"
                      name="matricula"
                      type="text"
                      label="Matricula"
                      helperText={errors.matricula}
                      error={errors.matricula ? true : false}
                      value={this.state.matricula}
                      onChange={this.handleChange}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      name="sexo"
                      value={this.state.sexo}
                      variant="filled"
                      label="Sexo"
                      helperText={errors.sexo}
                      error={errors.sexo ? true : false}
                      fullWidth
                      onChange={this.handleChange}
                    >
                      <MenuItem value={true}>Masculino</MenuItem>
                      <MenuItem value={false}>Feminino</MenuItem>
                    </TextField>
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={4}>
                    <InputMask
                      mask="999.999.999-99"
                      value={this.state.cpf}
                      onChange={this.handleChange}
                    >
                      {() => (
                        <TextField
                          id="cpf"
                          name="cpf"
                          type="text"
                          label="CPF"
                          helperText={errors.cpf}
                          error={errors.cpf ? true : false}
                          variant="filled"
                          fullWidth
                        />
                      )}
                    </InputMask>
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={4}>
                    <InputMask
                      mask="99/99/9999"
                      value={this.state.nascimento}
                      onChange={this.handleChange}
                    >
                      {() => (
                        <TextField
                          id="nascimento"
                          name="nascimento"
                          type="text"
                          label="Nascimento"
                          helperText={errors.nascimento}
                          error={errors.nascimento ? true : false}
                          variant="filled"
                          fullWidth
                        />
                      )}
                    </InputMask>
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      label="Email"
                      helperText={errors.email}
                      error={errors.email ? true : false}
                      value={this.state.email}
                      onChange={this.handleChange}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={4}>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={this.state.telefone}
                      onChange={this.handleChange}
                    >
                      {() => (
                        <TextField
                          id="telefone"
                          name="telefone"
                          type="text"
                          label="Telefone"
                          helperText={errors.telefone}
                          error={errors.telefone ? true : false}
                          variant="filled"
                          fullWidth
                        />
                      )}
                    </InputMask>
                  </Grid>
                )}
                {!loading && (
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="pais"
                      name="pais"
                      type="text"
                      label="Pais"
                      helperText={errors.pais}
                      error={errors.pais ? true : false}
                      value={this.state.pais}
                      onChange={this.handleChange}
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <ButtonGroup
                    fullWidth
                    aria-label="Full width contained button group"
                    variant="contained"
                    color="primary"
                  >
                    <Button
                      disabled={loadingPost}
                      type="submit"
                      color="dark"
                      className={classes.button}
                    >
                      Salvar
                      {loadingPost && (
                        <CircularProgress
                          size={30}
                          className={classes.progress}
                        />
                      )}
                    </Button>
                    <Button onClick={this.handleClick} color="dark">
                      Dados de Desempenho
                    </Button>
                    <Button component={Link} to="/listaDeAlunos" color="dark">
                      Voltar
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </form>
            <Snackbar
              TransitionComponent={Fade}
              className={classes.snack}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={snackOpen}
              autoHideDuration={3000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={<span id="message-id">{message.message}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          </div>
        </Fade>
      </div>
    )
  }
}

aluno.props = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(aluno)
