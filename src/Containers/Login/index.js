import React, { Component } from 'react';
import {
  Button,
  Avatar,
  Divider,
  Paper,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { AccountCircle, VisibilityOff, Visibility } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import blue from '@material-ui/core/colors/blue';

import SessionActions from '../../Stores/Session/actions';
import * as selectors from '../../Stores/Session/selector';
import { SpanButtonText } from './styles';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 450,
    borderRadius: 5,
    border: 'thin solid #888',
    boxShadow: '1px 1px 1px grey'
    // color: theme.palette.getContrastText(blue[500])

    // whiteSpace: 'nowrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssRoot: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700]
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonGoogle: {
    margin: theme.spacing.unit,
    backgroundColor: blue[600]
  },
  avatarIcone: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 22,
    height: 22
    // backgroundColor: '#fff'
  },
  rootPaper: {
    display: 'flex',
    flexDirection: 'column',
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  }
});

const iconGoogle = require('../../Assets/Images/Google__G__Logo.png');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false
    };
  }

  handleGoogleLogin = () => {
    const { onSignInGoogleRequest } = this.props;
    onSignInGoogleRequest();
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    const { showPassword, password } = this.state;
    return (
      <div className={classes.container}>
        <Paper className={classes.rootPaper} elevation={1}>
          <TextField
            className={classes.margin}
            label="Usuário"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle style={{ marginLeft: 11, marginRight: 12 }} />
                </InputAdornment>
              )
            }}
          />
          <TextField
            className={classNames(classes.margin, classes.textField)}
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={password}
            onChange={this.handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button variant="outlined" className={classes.button}>
            Entrar
          </Button>
        </Paper>
        <Divider />
        <div>
          <Button variant="outlined" className={classes.buttonGoogle}>
            <div className={classes.avatarIcone}>
              <Avatar
                alt="Login Google"
                src={iconGoogle}
                className={classes.avatar}
              />
            </div>
            <SpanButtonText>Google</SpanButtonText>
          </Button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignInGoogleRequest: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  loading: selectors.selectorLoading(),
  error: selectors.selectorError(),
  user: selectors.selectorSessionUser()
});

const mapDispatchToProps = dispatch => ({
  onLogin: payload =>
    dispatch(SessionActions.loginRequest(payload.email, payload.password)),
  onSignInGoogleRequest: () => dispatch(SessionActions.signInGoogleRequest()),
  onResetRedux: () => dispatch(SessionActions.resetRedux())
});

const LoginPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default withStyles(styles)(LoginPageRedux);
