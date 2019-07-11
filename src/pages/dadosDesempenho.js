import React, { Component } from 'react'
import Loader from '../components/Loader'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Typography } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import history from '../util/history'
import formatTitle from '../util/formatTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
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

class dadosDesempenho extends Component {
  componentDidMount() {
    this.setState({
      email: history.location.state.email
    })

    const config = {
      headers: {
        Authorization: localStorage.FBidToken
      }
    }

    const user = {
      email: history.location.state.email
    }

    axios
      .post('getDadosDesempenho', user, config)
      .then(res => {
        this.setState({
          res: res,
          FC: res.data.FC,
          PA: res.data.PA,
          abdomen: res.data.abdomen,
          abdomenMeta: res.data.abdomenMeta,
          agachamento: res.data.agachamento,
          agachamentoMeta: res.data.agachamentoMeta,
          altura: res.data.altura,
          apoio: res.data.apoio,
          apoioMeta: res.data.apoioMeta,
          bf: res.data.bf,
          bfMeta: res.data.bfMeta,
          bracoRelax: res.data.bracoRelax,
          bracoTenso: res.data.bracoTenso,
          cintura: res.data.cintura,
          flex: res.data.flex,
          flexMeta: res.data.flexMeta,
          gorduraVisceral: res.data.gorduraVisceral,
          idadeBio: res.data.idadeBio,
          imc: res.data.imc,
          imcMeta: res.data.imcMeta,
          itmMeta: res.data.itmMeta,
          muscular: res.data.muscular,
          muscularMeta: res.data.muscularMeta,
          pccqMeta: res.data.pccqMeta,
          peso: res.data.peso,
          pesoMeta: res.data.pesoMeta,
          quadril: res.data.quadril,
          taxaMetabolica: res.data.taxaMetabolica,
          vo2: res.data.vo2,
          vo2Meta: res.data.vo2Meta,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
  }

  constructor() {
    super()
    this.state = {
      errors: {},
      message: {},
      loading: true,
      loadingPost: false,
      snackOpen: false
    }
  }

  createFields = () => {
    let fields = []
    for (let val in this.state.res.data) {
      fields.push(
        <Grid key={val} item xs={12} sm={4} md={3} lg={2}>
          <TextField
            name={val}
            type="text"
            label={formatTitle(val)}
            helperText={this.state.errors[val]}
            error={this.state.errors[val] ? true : false}
            value={this.state[val]}
            onChange={this.handleChange}
            variant="filled"
            style={{ display: val.includes('Inicial') ? 'none' : 'initial' }}
          />
        </Grid>
      )
    }
    return fields
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleReset = () => {
    this.setState({
      FC: '',
      PA: '',
      abdomen: '',
      abdomenMeta: '',
      agachamento: '',
      agachamentoMeta: '',
      altura: '',
      apoio: '',
      apoioMeta: '',
      bf: '',
      bfMeta: '',
      bracoRelax: '',
      bracoTenso: '',
      cintura: '',
      flex: '',
      flexMeta: '',
      gorduraVisceral: '',
      idadeBio: '',
      imc: '',
      imcMeta: '',
      itmMeta: '',
      muscular: '',
      muscularMeta: '',
      pccqMeta: '',
      peso: '',
      pesoMeta: '',
      quadril: '',
      taxaMetabolica: '',
      vo2: '',
      vo2Meta: ''
    })
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
      email: this.state.email,
      FC: this.state.FC,
      PA: this.state.PA,
      abdomen: this.state.abdomen,
      abdomenMeta: this.state.abdomenMeta,
      agachamento: this.state.agachamento,
      agachamentoMeta: this.state.agachamentoMeta,
      altura: this.state.altura,
      apoio: this.state.apoio,
      apoioMeta: this.state.apoioMeta,
      bf: this.state.bf,
      bfMeta: this.state.bfMeta,
      bracoRelax: this.state.bracoRelax,
      bracoTenso: this.state.bracoTenso,
      cintura: this.state.cintura,
      flex: this.state.flex,
      flexMeta: this.state.flexMeta,
      gorduraVisceral: this.state.gorduraVisceral,
      idadeBio: this.state.idadeBio,
      imc: this.state.imc,
      imcMeta: this.state.imcMeta,
      itmMeta: this.state.itmMeta,
      muscular: this.state.muscular,
      muscularMeta: this.state.muscularMeta,
      pccqMeta: this.state.pccqMeta,
      peso: this.state.peso,
      pesoMeta: this.state.pesoMeta,
      quadril: this.state.quadril,
      taxaMetabolica: this.state.taxaMetabolica,
      vo2: this.state.vo2,
      vo2Meta: this.state.vo2Meta,
      pccqInicial: this.state.pccqInicial,
      itmInicial: this.state.itmInicial,
      muscularInicial: this.state.muscularInicial,
      vo2Inicial: this.state.vo2Inicial,
      flexInicial: this.state.flexInicial,
      agachamentoInicial: this.state.agachamentoInicial,
      apoioInicial: this.state.apoioInicial,
      abdomenInicial: this.state.abdomenInicial
    }
    axios
      .post('/postDadosDesempenho', userData, config)
      .then(res => {
        this.setState({
          message: res.data,
          loadingPost: false,
          snackOpen: true
        })
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        this.setState({
          errors: err.response.data,
          loadingPost: false
        })
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
    const { message, loading, loadingPost, snackOpen } = this.state
    return (
      <div>
        <Navbar buttons={true} link1={'/home'} link2={'/'} />
        <Fade in={true} timeout={{ enter: 250 }}>
          <div>
            <Typography variant="h3" className={classes.title}>
              Dados de Desempenho
            </Typography>
            <Typography variant="h5" className={classes.title}>
              {history.location.state.nome}
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={1}>
                {loading && <Loader size={100} height={'35vh'} />}
                {!loading && this.createFields()}
                <Grid item xs={12}>
                  <ButtonGroup
                    fullWidth
                    aria-label="Full width contained button group"
                    variant="contained"
                    color="primary"
                  >
                    <Button
                      type="submit"
                      color="dark"
                      className={classes.button}
                      disabled={loadingPost}
                    >
                      Salvar
                      {loadingPost && (
                        <CircularProgress
                          size={30}
                          className={classes.progress}
                        />
                      )}
                    </Button>
                    <Button
                      type="reset"
                      onClick={this.handleReset}
                      color="dark"
                    >
                      Limpar
                    </Button>
                    <Button onClick={() => history.goBack()} color="dark">
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

dadosDesempenho.props = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(dadosDesempenho)
