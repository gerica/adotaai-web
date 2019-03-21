import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuList, Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deepOrange } from '@material-ui/core/colors';

import * as selectorsSession from '../../Stores/Session/selector';
import routes from '../../Utils/routes';
import SessionActions from '../../Stores/Session/actions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    // eslint-disable-next-line no-mixed-operators
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      // eslint-disable-next-line no-mixed-operators
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 0.5
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  orangeAvatar: {
    // margin: 10,
    width: 30,
    height: 30,
    color: '#fff',
    backgroundColor: deepOrange[500]
  }
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  onClickLink = route => {
    routes.forEach(e => {
      // eslint-disable-next-line no-unneeded-ternary
      e.selected = e.path === route.path ? true : false;
    });
  };

  onSignOutRequest = () => {
    const { onSignOutRequest } = this.props;
    onSignOutRequest();
  };

  renderMenuTop() {
    const { user } = this.props;
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const menus = [];

    if (user) {
      const routePerfil = routes.find(e => e.order === 2);
      menus.push(
        <MenuItem
          key={3}
          onClick={() => {
            this.onClickLink(routePerfil);
            this.handleMenuClose();
          }}
          component={Link}
          to={routePerfil.path}
        >
          Perfil
        </MenuItem>
      );
      menus.push(
        <MenuItem
          key={2}
          onClick={() => {
            this.onSignOutRequest();
            this.handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      );
    } else {
      const routeLogin = routes.find(e => e.order === 3);
      menus.push(
        <MenuItem
          key={3}
          onClick={() => {
            this.onClickLink(routeLogin);
            this.handleMenuClose();
          }}
          component={Link}
          to={routeLogin.path}
        >
          {/* containerElement={<Link to={routeLogin.path} />} */}
          Login
        </MenuItem>
      );
      menus.push(
        <MenuItem
          key={4}
          onClick={() => {
            this.onClickLink(routeLogin);
            this.handleMenuClose();
          }}
          component={Link}
          to={`${routeLogin.path}/true`}
        >
          Sigin
        </MenuItem>
      );
    }

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {menus}
      </Menu>
    );
  }

  renderMenuSidebar() {
    const { user } = this.props;
    const routesFilter = routes.filter(r => {
      if (r.order === 2) {
        // eslint-disable-next-line no-unneeded-ternary
        return user ? true : false;
      }
      if (r.order === 3) {
        // eslint-disable-next-line no-unneeded-ternary
        return user ? false : true;
      }
      return true;
    });
    return (
      <MenuList>
        {routesFilter.map(prop => {
          return (
            <MenuItem
              selected={prop.selected}
              onClick={() => {
                this.onClickLink(prop);
                this.handleMenuClose();
              }}
              component={Link}
              to={prop.path}
              key={prop.order}
            >
              <ListItemIcon>
                <prop.icon />
              </ListItemIcon>
              <ListItemText primary={prop.sidebarName} />
            </MenuItem>
          );
        })}
      </MenuList>
    );
  }

  renderAvatar() {
    const { user, classes } = this.props;
    // console.log(user);
    if (user) {
      if (user.photoURL) {
        return (
          <Avatar
            aria-label="Recipe"
            style={{ width: 30, height: 30 }}
            src={user.photoURL}
          />
        );
      }
      if (user.userCustom) {
        return (
          <Avatar className={classes.orangeAvatar}>
            {user.userCustom.name.substr(0, 1)}
          </Avatar>
        );
      }
    }
    return <AccountCircle />;
  }

  render() {
    const { classes, theme, children, user } = this.props;
    const { anchorEl, open } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {' '}
              Adota Aí
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Pesquisar"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {user ? (
                <Fragment>
                  <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Fragment>
              ) : null}
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                {this.renderAvatar()}
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {this.renderMenuSidebar()}
          <Divider />
        </Drawer>
        {this.renderMenuTop()}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  // classes: PropTypes.objectOf(PropTypes.object()).isRequired,
  // theme: PropTypes.objectOf(PropTypes.object()).isRequired
  user: PropTypes.object
  // onSignOutRequest: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  user: selectorsSession.selectorSessionUser()
});

const mapDispatchToProps = dispatch => ({
  onSignOutRequest: () => dispatch(SessionActions.signOutRequest())
});

const MiniDrawerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniDrawer);

export default withStyles(styles, { withTheme: true })(MiniDrawerRedux);
