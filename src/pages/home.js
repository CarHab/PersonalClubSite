import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import addAlunoIcone from '../images/addAlunoIcone.png'
import alunosIcone from '../images/alunosIcone.png'
import blockAlunoIcone from '../images/blockAlunoIcone.png'
import Fade from '@material-ui/core/Fade'
import Navbar from '../components/Navbar'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 20
  }
})

export default function SimpleCard() {
  const classes = useStyles()

  return (
    <div>
      <Navbar buttons={true} link1={'/home'} link2={'/'} />
      <Grid container>
        <Grid item xs>
          <Fade in={true} timeout={{ enter: 250 }}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to="/addAluno">
                <CardMedia
                  component="img"
                  alt="Adicionar aluno"
                  height="400"
                  image={addAlunoIcone}
                  title=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Adicionar Aluno
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Adicione alunos em sua academia
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Fade>
        </Grid>
        <Grid item xs>
          <Fade in={true} timeout={{ enter: 250 }}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to="/listaDeAlunos">
                <CardMedia
                  component="img"
                  alt="Alunos"
                  height="400"
                  image={alunosIcone}
                  title=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Alunos
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Veja todos os alunos matriculados
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Fade>
        </Grid>
        <Grid item xs>
          <Fade in={true} timeout={{ enter: 250 }}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to="/blockAluno">
                <CardMedia
                  component="img"
                  alt="Bloquear acesso"
                  height="400"
                  image={blockAlunoIcone}
                  title=""
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Bloquear Acesso
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Remova ou desabilite acesso ao aplicativo
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </div>
  )
}
