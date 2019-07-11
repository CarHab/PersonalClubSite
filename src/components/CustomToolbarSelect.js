import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import BlockIcon from '@material-ui/icons/Block'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative'
  },
  deleteIcon: {
    color: 'primary'
  }
}

class CustomToolbarSelect extends Component {
  state = {
    open: false
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
      id: this.props.displayData[
        Number(Object.keys(this.props.selectedRows.lookup))
      ].data[4]
    }

    axios
      .post('/blockAluno', id, config)
      .then(res => {
        console.log(res.data)
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
      id: this.props.displayData[
        Number(Object.keys(this.props.selectedRows.lookup))
      ].data[4]
    }

    axios
      .post('/deleteAluno', id, config)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state

    return (
      <div className={'custom-toolbar-select'}>
        <Tooltip title={'Ativar/Desativar'}>
          <IconButton
            className={classes.iconButton}
            onClick={this.handleToggle}
          >
            <BlockIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <Tooltip title={'Apagar'}>
          <IconButton
            className={classes.iconButton}
            onClick={this.handleDelete}
          >
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>

        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Apagar todos os dados do aluno?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleDisable} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
export default withStyles(defaultToolbarSelectStyles, {
  name: 'CustomToolbarSelect'
})(CustomToolbarSelect)
