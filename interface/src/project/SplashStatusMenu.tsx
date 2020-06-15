import React, { Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import { PROJECT_PATH } from '../api';
import { AcUnitOutlined } from '@material-ui/icons';

class SplashStatusMenu extends Component<RouteComponentProps> {

  render() {
    const path = this.props.match.url;
    return (
      <List>
        <ListItem to={`/${PROJECT_PATH}/sp70/`} selected={path.startsWith(`/${PROJECT_PATH}/sp70/status`)} button component={Link}>
          <ListItemIcon>
            <AcUnitOutlined />
          </ListItemIcon>
          <ListItemText primary="Fridge/Freezer" />
        </ListItem>
      </List>
    )
  }

}

export default withRouter(SplashStatusMenu);
