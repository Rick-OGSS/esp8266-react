import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import SplashQuestionTable from './setup/SplashQuestionTable';
import setupDeviceParameters from './setup/setupDeviceParameters';
import { SectionContent } from '../components';

var sectionOverview: string = setupDeviceParameters.overview[0].text

class SplashDeviceSetup extends Component {

  render() {
    return (
      <SectionContent title='Device Configuration' titleGutter>
        <Typography variant="body1" paragraph align='center'>{sectionOverview}  </Typography>
        <SplashQuestionTable />
      </SectionContent>
    )
  }
}

export default SplashDeviceSetup;
