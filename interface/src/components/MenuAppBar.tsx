import React, { RefObject } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { Drawer, AppBar, Toolbar, Avatar, Divider, Button, Box, IconButton, Collapse } from '@material-ui/core';
import { ClickAwayListener, Popper, Hidden, Typography } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';


import { withStyles, createStyles, Theme, WithTheme, WithStyles, withTheme } from '@material-ui/core/styles';

import WifiIcon from '@material-ui/icons/Wifi';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import LockIcon from '@material-ui/icons/Lock';
import MenuIcon from '@material-ui/icons/Menu';

import SplashStatusMenu from '../project/SplashStatusMenu';
import { PROJECT_NAME } from '../api';
import { withAuthenticatedContext, AuthenticatedContextProps } from '../authentication';
//import ProjectConfigMenu from '../project/ProjectConfigMenu';
import { ExpandLess, ExpandMore } from '@material-ui/icons';




const drawerWidth = 290;

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  toolbarImage: {
    [theme.breakpoints.up('xs')]: {
      height: 24,
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      height: 36,
      marginRight: theme.spacing(3)
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1
  },
  authMenu: {
    zIndex: theme.zIndex.tooltip,
    maxWidth: 400,
  },
  authMenuActions: {
    padding: theme.spacing(2),
    "& > * + *": {
      marginLeft: theme.spacing(2),
    }
  },
});

interface MenuAppBarState {
  mobileOpen: boolean;
  authMenuOpen: boolean;
  openNetwork: boolean;
  openMisc: boolean;
}

interface MenuAppBarProps extends AuthenticatedContextProps, WithTheme, WithStyles<typeof styles>, RouteComponentProps {
  sectionTitle: string;
}

class MenuAppBar extends React.Component<MenuAppBarProps, MenuAppBarState> {

  constructor(props: MenuAppBarProps) {
    super(props);
    this.state = {
      mobileOpen: false,
      authMenuOpen: false,
      openNetwork: false,
      openMisc: false
    };
  }

  anchorRef: RefObject<HTMLButtonElement> = React.createRef();

  handleToggle = () => {
    this.setState({ authMenuOpen: !this.state.authMenuOpen });
  }

  handleClose = (event: React.MouseEvent<Document>) => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.currentTarget)) {
      return;
    }
    this.setState({ authMenuOpen: false });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  handleNetworkExpand = () => {
    this.setState({ openNetwork: !this.state.openNetwork });
  };

  handleMiscExpand = () => {
    this.setState({ openMisc: !this.state.openMisc });
  };

  render() {
    const { classes, theme, children, sectionTitle, authenticatedContext } = this.props;
    // console.group("Menu Props location: ", this.props.location)
    // console.group("Menu Props Authent Context: ", this.props.authenticatedContext)
    const { mobileOpen, authMenuOpen } = this.state;
    const path = this.props.match.url;
    const drawer = (
      <div>
        <Toolbar>
          <Box display="flex">
            <img src="/app/icon.png" className={classes.toolbarImage} alt={PROJECT_NAME} />
          </Box>
          <Typography variant="h6" color="textPrimary">
            {PROJECT_NAME}
          </Typography>
          <Divider absolute />
        </Toolbar>
        <Divider />
        <SplashStatusMenu />
        <Divider />
        <List>
        {/* {console.log("link: ",Link.arguments())} */}
        {console.log("path: ",path.toString())}
          <ListItem to='/setup/' selected={path.startsWith('/setup/')} button component={Link}>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Unit Setup" />
          </ListItem>

          <ListItem button onClick={this.handleNetworkExpand}>
            <ListItemText primary="Networks" />
            {this.state.openNetwork ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openNetwork} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

              <ListItem to='/wifi/' selected={path.startsWith('/wifi/')} button component={Link}>
                <ListItemIcon>
                  <WifiIcon />
                </ListItemIcon>
                <ListItemText primary="WiFi Connection" />
              </ListItem>
              <ListItem to='/ap/' selected={path.startsWith('/ap/')} button component={Link}>
                <ListItemIcon>
                  <SettingsInputAntennaIcon />
                </ListItemIcon>
                <ListItemText primary="Access Point" />
              </ListItem>
              <ListItem to='/ntp/' selected={path.startsWith('/ntp/')} button component={Link}>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Network Time" />
              </ListItem>
              <ListItem to='/mqtt/' selected={path.startsWith('/mqtt/')} button component={Link}>
                <ListItemIcon>
                  <DeviceHubIcon />
                </ListItemIcon>
                <ListItemText primary="MQTT" />
              </ListItem>

            </List>
          </Collapse>

          <ListItem button onClick={this.handleMiscExpand}>
            <ListItemText primary="Miscellaneous" />
            {this.state.openMisc ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openMisc} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>


              <ListItem to='/security/' selected={path.startsWith('/security/')} button component={Link} disabled={!authenticatedContext.me.admin}>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <ListItem to='/system/' selected={path.startsWith('/system/')} button component={Link} >
              
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="System" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar} elevation={0}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.title} align='center'>
              {sectionTitle}
            </Typography>
            <div>
              <IconButton
                ref={this.anchorRef}
                aria-owns={authMenuOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Popper open={authMenuOpen} anchorEl={this.anchorRef.current} transition className={classes.authMenu}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <Card id="menu-list-grow">
                    <CardContent>
                      <List disablePadding>
                        <ListItem disableGutters>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountCircleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={"Signed in as: " + authenticatedContext.me.username} secondary={authenticatedContext.me.admin ? "Admin User" : undefined} />
                        </ListItem>
                      </List>
                    </CardContent>
                    <Divider />
                    <CardActions className={classes.authMenuActions}>
                      <Button variant="contained" fullWidth color="primary" onClick={authenticatedContext.signOut}>Sign Out</Button>
                    </CardActions>
                  </Card>
                </ClickAwayListener>
              </Popper>
            </div>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

export default withRouter(
  withTheme(
    withAuthenticatedContext(
      withStyles(styles)(MenuAppBar)
    )
  )
);
