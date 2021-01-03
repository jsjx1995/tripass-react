import React from 'react';
import { Card, CardContent, createStyles, makeStyles, Theme, CardHeader } from '@material-ui/core';
import { Facility } from 'interfaces/facility.dto';
import Avatar from '@material-ui/core/Avatar'
import ShowCurrentDayBusinessHours from 'components/atoms/ShowCurrentDayBusinessHours'
import IsOpen from 'components/atoms/IsOpen'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import GetIcon from 'components/atoms/GetIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 280,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
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
    avatar: {
      // backgroundColor: red[500],
    },
  })
)

// type InfoWindowProps = {
//   facility: Facility
// }

const InfoWindow: React.FC<{ facility: Facility }> = ({ facility }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
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
    </Card>
  );
}


export default InfoWindow;