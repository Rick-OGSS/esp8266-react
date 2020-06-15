import React, { Component } from 'react';
import { Typography} from '@material-ui/core';
import { SectionContent } from '../components';
import QuestionTable from './setup/QuestionTable';

class SplashDeviceSetup extends Component {

  render() {
    return (
      <SectionContent title='Refrigeration System Configuration' titleGutter>
        <Typography variant="body1" paragraph>
          This section allows you to define the parameters of your refrigeration system.
        </Typography>

        {/* <Box mt={2}>
          <Typography variant="body1">
          Visit the Splash Website for more information and support. <a href="https://github.com/rjwats/esp8266-react/"> </a> </Typography>
        </Box> */}
        <QuestionTable />

      </SectionContent>
    )
  }
}

export default SplashDeviceSetup;
