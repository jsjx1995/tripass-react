import React from 'react';
import { Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Facility } from 'interfaces/facility.dto';

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
  })
)

type InfoWindowProps = {
  facility: Facility
}

const InfoWindow: React.FC<InfoWindowProps> = ({ facility }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom component="h2">
          {facility.title}
        </Typography>
        <Typography component="p">
          {facility.address}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default InfoWindow;