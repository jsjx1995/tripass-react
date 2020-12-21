import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { Facility } from 'interfaces/facility.dto';
import styled from 'styled-components';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

type InfoWindowProps = {
  facility: Facility
}

const InfoWindow: React.FC<InfoWindowProps> = (props) => {
  // const { classes } = props;
  return (
    <StyleD>
      <Card>
        <CardContent>
          <Typography gutterBottom component="h2">
            {props.facility.title}
          </Typography>
          <Typography component="p">
            {props.facility.address}
          </Typography>
        </CardContent>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </StyleD>
  );
}


export default withStyles(styles)(InfoWindow);


const StyleD = styled.div`
.gm-ui-hover-effect {display: none;}
`