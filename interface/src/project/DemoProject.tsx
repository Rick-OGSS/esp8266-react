import React, { Component } from 'react';
import { Redirect, Switch, RouteComponentProps } from 'react-router-dom'

import { Tabs, Tab } from '@material-ui/core';

import { PROJECT_PATH } from '../api';
import { MenuAppBar } from '../components';
import { AuthenticatedRoute } from '../authentication';

import DemoInformation from './DemoInformation';
import LightStateRestController from './LightStateRestController';
import LightStateWebSocketController from './LightStateWebSocketController';
import LightMqttSettingsController from './LightMqttSettingsController';

class DemoProject extends Component<RouteComponentProps> {

  handleTabChange = (event: React.ChangeEvent<{}>, path: string) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <MenuAppBar sectionTitle="Refrigeration Controller">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} variant="fullWidth">
          <Tab value={`/${PROJECT_PATH}/sp70/information`} label="Information" />
          <Tab value={`/${PROJECT_PATH}/sp70/config`} label="Device Configuration" />
          <Tab value={`/${PROJECT_PATH}/sp70/rest`} label="REST Controller" />
          <Tab value={`/${PROJECT_PATH}/sp70/socket`} label="WebSocket Controller" />
          <Tab value={`/${PROJECT_PATH}/sp70/mqtt`} label="MQTT Controller" />
        </Tabs>
        <Switch>
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/sp70/information`} component={DemoInformation} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/sp70/config`} component={LightStateRestController} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/sp70/rest`} component={LightStateRestController} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/sp70/socket`} component={LightStateWebSocketController} />
          <AuthenticatedRoute exact path={`/${PROJECT_PATH}/sp70/mqtt`} component={LightMqttSettingsController} />
          <Redirect to={`/${PROJECT_PATH}/sp70/information`} />
        </Switch>
      </MenuAppBar>
    )
  }

}

export default DemoProject;
