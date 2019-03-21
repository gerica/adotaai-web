import React, { Component } from 'react';
import { Button, Avatar, Paper, CircularProgress } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
// import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import blue from '@material-ui/core/colors/blue';
import { Redirect } from 'react-router-dom';

import SessionActions from '../../Stores/Session/actions';
import * as selectors from '../../Stores/Session/selector';
import { SpanButtonText } from './styles';
import {
  createValidator,
  required,
  email,
  minLengthPassword,
  matchPassword
} from '../../Utils/validation';
import TextInputBase from '../../Components/Form/TextInputBase';
import CustomizedSnackbars from '../../Components/Snackbars/CustomizedSnackbars';
import { ROUTER_HOME } from '../../Utils/constants';

const styles = theme => ({
  meioTelaDiv: {
    height: '50%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    content: '',
    zIndex: 0,
    backgroundColor: theme.palette.primary.main
  },
  mainCenter: {
    width: '30%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    '-webkitTransform': 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'
  },
  container: {
    borderRadius: 5,
    border: 'thin solid #888',
    boxShadow: '1px 1px 1px grey',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: theme.spacing.unit
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
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  containerTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  rootPaper: {
    display: 'flex',
    flexDirection: 'column',
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1
  },
  buttonEntrar: {
    // margin: theme.spacing.unit,
    backgroundColor: blue[600]
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '75%',
    marginTop: -12,
    marginLeft: -12
  }
});

const iconGoogle = require('../../Assets/Images/Google__G__Logo.png');
const logo = require('../../Assets/Images/cao_gato_limpo_250x220.png');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showLogin: true
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const { showSignin } = match.params;
    if (showSignin) {
      this.setState({ showLogin: false });
    }
  }

  shouldComponentUpdate(nextProps) {
    const { user, onResetRedux, reset } = nextProps;

    if (user) {
      onResetRedux();
      reset();
      // navigation.navigate('homeStack', { msg: 'Login efetuado com sucesso.', user });
      // return false;
    }
    return true;
  }

  onSubmit(values) {
    const { onLogin, onSignIn } = this.props;
    const { showLogin } = this.state;
    if (showLogin) {
      onLogin(values);
    } else {
      onSignIn(values);
    }
    // console.log(values);
  }

  onSignInGoogle = () => {
    const { onSignInGoogleRequest } = this.props;
    onSignInGoogleRequest();
  };

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

  handleToggleShowLogin = () => {
    const { showLogin } = this.state;
    this.setState({ showLogin: !showLogin });
  };

  renderLogin() {
    const {
      classes,
      handleSubmit,
      loading,
      errorObj,
      onResetRedux
    } = this.props;
    const { showPassword } = this.state;

    return (
      <div style={{ display: 'flex' }}>
        {errorObj ? (
          <CustomizedSnackbars
            message={errorObj.message}
            variant="error"
            onCleanMsg={onResetRedux}
          />
        ) : null}
        <div className={classes.meioTelaDiv} />
        <div className={classes.mainCenter}>
          <div className={classes.container}>
            {/* <form onSubmit={handleSubmit(this.onSubmit)}> */}
            <div className={classes.containerTitle}>
              <img src={logo} alt="Adota Ai" />
              <h1 className={classes.title}>Adota ai!</h1>
            </div>
            <Paper className={classes.rootPaper} elevation={2}>
              <Field
                name="email"
                label="E-mail"
                adornment
                required
                component={TextInputBase}
              />
              <Field
                name="password"
                label="Senha"
                adornment
                showPassword={showPassword}
                typeField="password"
                handleClickShowPassword={this.handleClickShowPassword}
                required
                component={TextInputBase}
              />
            </Paper>
            {/* <Divider /> */}
            <div className={classes.containerButtons}>
              <Button variant="outlined" onClick={this.onSignInGoogle}>
                <Avatar
                  alt="Login Google"
                  src={iconGoogle}
                  className={classes.avatar}
                />
              </Button>
              <div className={classes.wrapper}>
                <Button
                  className={classes.button}
                  onClick={this.handleToggleShowLogin}
                >
                  Criar Usuário
                </Button>
                <Button
                  variant="contained"
                  className={classes.buttonEntrar}
                  disabled={loading}
                  onClick={handleSubmit(this.onSubmit)}
                >
                  <SpanButtonText>Entrar</SpanButtonText>
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }

  renderSigin() {
    const {
      classes,
      handleSubmit,
      loading,
      errorObj,
      onResetRedux
    } = this.props;
    const { showPassword } = this.state;
    // const loading = true;
    return (
      <div style={{ display: 'flex' }}>
        {errorObj ? (
          <CustomizedSnackbars
            message={errorObj.message}
            variant="error"
            onCleanMsg={onResetRedux}
          />
        ) : null}
        <div className={classes.meioTelaDiv} />
        <div className={classes.mainCenter}>
          <div className={classes.container}>
            <div className={classes.containerTitle}>
              <img src={logo} alt="Adota Ai" />
              <h1 className={classes.title}>Adota ai!</h1>
            </div>
            <Paper className={classes.rootPaper} elevation={2}>
              <Field
                name="name"
                label="Nome"
                adornment
                required
                component={TextInputBase}
              />
              <Field
                name="email"
                label="E-mail"
                adornment
                required
                component={TextInputBase}
              />
              <Field
                name="password"
                label="Senha"
                adornment
                showPassword={showPassword}
                typeField="password"
                handleClickShowPassword={this.handleClickShowPassword}
                required
                component={TextInputBase}
              />
              <Field
                name="passwordConfirm"
                label="Confirmar Senha"
                adornment
                showPassword={showPassword}
                typeField="password"
                handleClickShowPassword={this.handleClickShowPassword}
                required
                component={TextInputBase}
              />
            </Paper>
            {/* <Divider /> */}
            <div className={classes.containerButtons}>
              <div />
              <div className={classes.wrapper}>
                <Button
                  className={classes.button}
                  onClick={this.handleToggleShowLogin}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  className={classes.buttonEntrar}
                  disabled={loading}
                  onClick={handleSubmit(this.onSubmit)}
                >
                  {/* Entrar */}
                  <SpanButtonText>Salvar</SpanButtonText>
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    if (user) {
      return <Redirect to={ROUTER_HOME} />;
    }

    const { showLogin } = this.state;
    if (showLogin) {
      return this.renderLogin();
    }
    return this.renderSigin();
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  onSignInGoogleRequest: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorObj: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  // user: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const mapStateToProps = createStructuredSelector({
  loading: selectors.selectorLoading(),
  errorObj: selectors.selectorError(),
  user: selectors.selectorSessionUser()
});

const mapDispatchToProps = dispatch => ({
  onLogin: payload =>
    dispatch(SessionActions.loginRequest(payload.email, payload.password)),
  onSignInGoogleRequest: () => dispatch(SessionActions.signInGoogleRequest()),
  onResetRedux: () => dispatch(SessionActions.resetRedux()),
  onSignIn: payload => dispatch(SessionActions.signInRequest(payload))
});

const validate = createValidator({
  name: [required],
  email: [required, email],
  password: [required, minLengthPassword],
  passwordConfirm: [required, matchPassword]
});

const reduxFormLogin = reduxForm({ form: 'loginPage', validate })(LoginPage);
const LoginPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormLogin);

export default withStyles(styles)(LoginPageRedux);
