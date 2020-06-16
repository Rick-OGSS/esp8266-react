import React, { Component } from 'react';
import { Typography, Box} from '@material-ui/core';
import SplashQuestionTable from './setup/SplashQuestionTable';
import setupDeviceParameters from './setup/setupDeviceParameters';

var sectionOverview: string =  setupDeviceParameters.overview[0].text
// console.log("Overivew from file: ", sectionOverview)

class SplashDeviceSetup extends Component {  

  render() {
    console.log("Overivew from file: ", sectionOverview)

    return (
      // <SectionContent title='Refrigeration System Configuration' titleGutter>
      <React.Fragment>
        <Box m={2}  pt={3}>
        <Typography variant="body1" paragraph gutterBottom align= 'center'> {sectionOverview}  </Typography>
        </Box>

        {/* <Box mt={2}>
          <Typography variant="body1">
          Visit the Splash Website for more information and support. <a href="https://github.com/rjwats/esp8266-react/"> </a> </Typography>
        </Box> */}
        <SplashQuestionTable />

      {/* </SectionContent> */}
      </React.Fragment>
    )
  }
}

export default SplashDeviceSetup;
