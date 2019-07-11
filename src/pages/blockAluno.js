import React, { Component } from 'react'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import history from '../util/history'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Navbar from '../components/Navbar'

const styles = {
  dialogTitle: {
    margin: 15
  },
  dialog: {
    padding: 30
  },
  button: {
    marginBottom: 15,
    marginTop: 15
  },
  close: {
    padding: 15
  }
}

class blockAluno extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      open: false,
      snackOpen: false,
      data: [],
      selectedActive: null,
      selectedId: null
    }
  }

  getData = () => {
    let data = []
    const config = {
      headers: {
        Authorization: localStorage.FBidToken
      }
    }
    axios
      .get('/listaDeAlunos', config)
      .then(res => {
        for (let aluno in res.data) {
          res.data[aluno].sexo = res.data[aluno].sexo ? 'Masculino' : 'Feminino'
          res.data[aluno].desativado = res.data[aluno].desativado
            ? 'Desativado'
            : 'Ativo'
          data.push(res.data[aluno])
        }
        this.setState({
          data: data,
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

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleDisable = () => {
    const config = {
      headers: {
        Authorization: localStorage.FBidToken
      }
    }

    const id = {
      id: this.state.selectedId
    }
    axios
      .post('/blockAluno', id, config)
      .then(res => {
        let dummy = this.state.data
        for (let aluno of dummy) {
          if (aluno.id === id.id) {
            aluno.desativado = aluno.desativado === 'Ativo' ? 'Desativado' : 'Ativo'
          }
        }
        this.setState({
          selectedActive: !this.state.selectedActive,
          message: res.data.message,
          snackOpen: true,
          data: dummy
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleDelete = () => {
    const config = {
      headers: {
        Authorization: localStorage.FBidToken
      }
    }
    const id = {
      id: this.state.selectedId
    }
    axios
      .post('/deleteAluno', id, config)
      .then(res => {
        let dummy = this.state.data.filter(aluno => {
          return aluno.id !== id.id
        })
        this.setState({
          open: !this.state.open,
          data: dummy,
          message: res.data.message,
          snackOpen: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    let emptyData = []
    this.setState({
      data: emptyData
    })
  }

  handleClose = () => {
    this.setState({
      snackOpen: false
    })
  }

  render() {
    const { classes } = this.props
    const {
      open,
      selectedAluno,
      selectedActive,
      message,
      snackOpen
    } = this.state
    const columns = [
      {
        name: 'nome',
        label: 'Nome',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'matricula',
        label: 'Matricula',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'cpf',
        label: 'CPF',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'sexo',
        label: 'Sexo',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'desativado',
        label: 'Status',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: 'id',
        label: 'Id',
        options: {
          filter: true,
          sort: true,
          display: false
        }
      }
    ]
    const options = {
      selectableRows: 'none',
      filter: false,
      print: false,
      download: false,
      viewColumns: false,
      onRowClick: event => {
        this.setState({
          open: !this.state.open,
          selectedAluno:
            event[0].split(' ')[0] +
            ' ' +
            event[0].split(' ')[event[0].split(' ').length - 1],
          selectedId: event[5],
          selectedActive: event[4] === 'Ativo' ? true : false
        })
      },
      textLabels: {
        body: {
          noMatch: 'Nenhum aluno encontrado',
          toolTip: 'Ordenar'
        },
        pagination: {
          next: 'Próxima Página',
          previous: 'Página Anterior',
          rowsPerPage: 'Alunos por página:',
          displayRows: 'de'
        },
        toolbar: {
          search: 'Buscar',
          downloadCsv: 'Baixar Tabela Excel',
          print: 'Imprimir',
          viewColumns: 'Mostrar Colunas',
          filterTable: 'Filtros'
        },
        filter: {
          all: 'Todos',
          title: 'FILTROS',
          reset: 'LIMPAR'
        },
        viewColumns: {
          title: 'Mostrar Colunas',
          titleAria: 'Mostrar/Esconder Colunas'
        },
        selectedRows: {
          text: 'fileira(s) selecionada(s)',
          delete: 'Apagar',
          deleteAria: 'Apagar fileira selecionada'
        }
      }
    }

    return (
      <div>
        <Navbar buttons={true} link1={'/home'} link2={'/'} />
        {this.state.loading ? (
          <div
            style={{
              display: 'flex',
              height: '80vh',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress size={100} />
          </div>
        ) : (
          <div>
            <MUIDataTable
              title={'Alunos'}
              data={this.state.data}
              columns={columns}
              options={options}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{ marginTop: 15 }}
                variant="contained"
                color="primary"
                onClick={() => history.push('/home')}
              >
                Voltar
              </Button>
            </div>
          </div>
        )}

        <Dialog
          open={open}
          fullWidth
          onClose={this.handleToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <Typography
            className={classes.dialogTitle}
            align="center"
            variant="h5"
          >
            {selectedAluno}
          </Typography>
          <DialogContent>
            <Grid
              component="label"
              container
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography variant="subtitle1">
                  Ativar/Desativar aluno
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={selectedActive}
                  color="primary"
                  onChange={this.handleDisable}
                />
              </Grid>
            </Grid>
            <Grid
              component="label"
              container
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography variant="subtitle1">
                  Esta ação não pode ser desfeita
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.handleDelete}
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                >
                  Apagar
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
        <Snackbar
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
          message={<span id="message-id">{message}</span>}
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
    )
  }
}

blockAluno.props = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(blockAluno)
