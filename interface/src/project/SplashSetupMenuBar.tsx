import React, { Component } from 'react';
import { Redirect, Switch, RouteComponentProps } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core';

import { MenuAppBar } from '../components';
import { AuthenticatedRoute, AuthenticatedContextProps } from '../authentication';

import LightStateRestController from './LightStateRestController';
import LightMqttSettingsController from './LightMqttSettingsController';
import SplashDeviceSetup from './SplashDeviceSetup';

// defines which tabs can be opened in guest mode
type SplashSetupProps = AuthenticatedContextProps & RouteComponentProps;

class SplashSetupMenuBar extends Component<SplashSetupProps, RouteComponentProps> {

  constructor(props: SplashSetupProps){
    super(props);
    // this.state = {

    // }
  }

  handleTabChange = (event: React.ChangeEvent<{}>, path: string) => {
    this.props.history.push(path);
  };

  render() {
    const { authenticatedContext} = this.props;
    return (
      <MenuAppBar sectionTitle="Refrigeration Controller Setup">
        {console.log("Rendering SplashSetupMenuBar")}
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value="/setup/deviceconfig" label="Device Parameters" />
          <Tab value="/setup/unitconfig" label="Unit Control Parameters" />
          <Tab value="/setup/alarmconfig" label="Alarms" />
        </Tabs>
        <Switch>
          <AuthenticatedRoute exact path="/setup/deviceconfig" component={SplashDeviceSetup} />
          <AuthenticatedRoute exact path="/setup/unitconfig" component={LightStateRestController} />
          <AuthenticatedRoute exact path="/setup/alarmconfig" component={LightMqttSettingsController} />
          <Redirect to="/setup/deviceconfig" />
        </Switch>
      </MenuAppBar>
    )
  }

}

export default SplashSetupMenuBar;
