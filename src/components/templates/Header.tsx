import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { ReactComponent as Logo } from '_assets/tripass-logo.svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#12bbd4'
    }
  }),
)

export default function Header() {
  const classes = useStyles()

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <div className={classes.menuButton} >
          <Logo />
        </div>
        <Typography variant="h6" className={classes.title}>
          TRIPASS
          </Typography>
      </Toolbar>
    </AppBar>
  )
}
