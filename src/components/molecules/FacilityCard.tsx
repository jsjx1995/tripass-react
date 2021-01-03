import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
// import { red } from '@material-ui/core/colors'
// import FavoriteIcon from '@material-ui/icons/Favorite'
import Avatar from '@material-ui/core/Avatar'
import { Facility } from 'interfaces/facility.dto'
import IsOpen from 'components/atoms/IsOpen'
import ShowCurrentDayBusinessHours from 'components/atoms/ShowCurrentDayBusinessHours'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import GetIcon from 'components/atoms/GetIcon'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      '&:hover': {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      }
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-around'
    },
    clock: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    link: {
      color: 'black',
      textDecoration: 'none',
      '&:visited': {
        color: 'black'
      }
    },
    avatar: {
      // backgroundColor: red[500],
    },
  }),
)


const FacilityCard: React.FC<{ facility: Facility }> = ({ facility }) => {
  const classes = useStyles()

  return (
    // <Card className={classes.root} onClick={() => history.push(`/detail?id=${facility.id}`)}>
    <Card className={classes.root} >
      <Link to={`/detail?id=${facility.id}`} target="_blank" className={classes.link} >
        <CardHeader
          // action={
          //   <IconButton aria-label="add to favorites">
          //     <FavoriteIcon />
          //   </IconButton>
          // }
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <GetIcon genre={facility.genre} />
            </Avatar>
          }
          title={facility.title}
        />
        <CardContent className={classes.cardContent}>
          <QueryBuilderIcon />
          <div className={classes.clock}>
            <ShowCurrentDayBusinessHours businessHours={facility.businesshours} />
          </div>
          <IsOpen businessHours={facility.businesshours} />
        </CardContent>
      </Link>
    </Card>
  )
}
export default FacilityCard