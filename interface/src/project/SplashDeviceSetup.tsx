import React, { Component } from 'react';
import { Typography, Box } from '@material-ui/core';
import SplashQuestionTable from './setup/SplashQuestionTable';
import setupDeviceParameters from './setup/setupDeviceParameters';

var sectionOverview: string = setupDeviceParameters.overview[0].text

class SplashDeviceSetup extends Component {

  render() {
    return (
      <React.Fragment>
        <Box m={3} pt={4}>
          <Typography variant="body1" paragraph gutterBottom align='center'> {sectionOverview}  </Typography>
        </Box>
        <SplashQuestionTable />
      </React.Fragment>
    )
  }
}

export default SplashDeviceSetup;
