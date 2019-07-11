import React, { Component } from 'react'
import axios from 'axios'
import MUIDataTable from 'mui-datatables'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import history from '../util/history'
import Navbar from '../components/Navbar'

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
    name: 'nascimento',
    label: 'Nascimento',
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: 'telefone',
    label: 'Telefone',
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: 'pais',
    label: 'Pais',
    options: {
      filter: true,
      sort: true,
      display: false
    }
  },
  {
    name: 'id',
    label: 'id',
    options: {
      filter: true,
      sort: true,
      display: false
    }
  }
]

let data = []

const options = {
  selectableRows: 'none',
  filter: false,
  print: false,
  download: false,
  viewColumns: false,
  onRowClick: event => {
    history.push({
      pathname: '/aluno',
      state: { user: event }
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

class listaDeAlunos extends Component {
  constructor() {
    super()
    this.state = {
      alunos: null,
      loading: true
    }
  }

  componentDidMount() {
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
          data.push(res.data[aluno])
        }
        console.log(data)
        this.setState({
          alunos: true,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          alunos: true,
          loading: false
        })
      })
  }

  componentWillUnmount() {
    this.setState({
      alunos: null
    })
    data = []
  }

  render() {
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
                data={data}
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
      </div>
    )
  }
}

export default listaDeAlunos
