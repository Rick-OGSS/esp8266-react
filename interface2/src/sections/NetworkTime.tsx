import React, { Component } from 'react';
import { Redirect, Switch, RouteComponentProps } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AuthenticatedRoute from '../authentication/AuthenticatedRoute';
import MenuAppBar from '../components/MenuAppBar';
import NTPStatus from '../containers/NTPStatus';
import { AuthenticatedContextProps, withAuthenticatedContext } from '../authentication/AuthenticationContext';

type NetworkTimeProps = AuthenticatedContextProps & RouteComponentProps;

class NetworkTime extends Component<NetworkTimeProps> {

  handleTabChange = (event: React.ChangeEvent<{}>, path: string) => {
    this.props.history.push(path);
  };

  render() {    
    // const { authenticatedContext } = this.props;
    return (
      <MenuAppBar sectionTitle="Network Time">
        <Tabs value={this.props.match.url} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          <Tab value="/ntp/status" label="NTP Status" />
          {
            // <Tab value="/ntp/settings" label="NTP Settings" disabled={!authenticatedContext.user.admin} />
          }
        </Tabs>
        <Switch>
          <AuthenticatedRoute exact={true} path="/ntp/status" component={NTPStatus} />
          {
            //<AuthenticatedRoute exact={true} path="/ntp/settings" component={NTPSettings} />
          }
          <Redirect to="/ntp/status" />
        </Switch>
      </MenuAppBar>
    )
  }

}

export default withAuthenticatedContext(NetworkTime)