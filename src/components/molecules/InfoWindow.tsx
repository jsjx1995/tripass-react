import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card,  CardContent, Typography } from '@material-ui/core';
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
      </Card>
    </StyleD>
  );
}


export default withStyles(styles)(InfoWindow);


const StyleD = styled.div`
.gm-ui-hover-effect {display: none;}
`