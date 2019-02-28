import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import * as selectorsSession from '../../Stores/Session/selector';
import SessionActions from '../../Stores/Session/actions';
import { ROUTER_HOME } from '../../Utils/constants';
import TextInputBase from '../../Components/Form/TextInputBase';
import { createValidator, required, phone } from '../../Utils/validation';
import CustomizedSnackbars from '../../Components/Snackbars/CustomizedSnackbars';

function TabContainer(props) {
  const { children } = props;
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

class PerfilPage extends React.Component {
  state = {
    value: 0,
    open: false,
    stateMessage: null
  };

  shouldComponentUpdate(nextProps) {
    const { message, onResetRedux, reset } = nextProps;

    if (message) {
      this.setState({ stateMessage: message });
      onResetRedux();
      reset();
      this.handleClose();
    }
    return true;
  }

  onSubmit = values => {
    const { updateRequest, user } = this.props;
    updateRequest({ user, dados: { ...values } });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClickOpen = () => {
    const { initialize, user } = this.props;
    initialize({
      contato: user.userCustom.contato
    });
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onHandleChangeMessage = () => {
    this.setState({ stateMessage: null });
  };

  renderInfoUser() {
    const { classes, user } = this.props;
    const { userCustom } = user;
    // const bull = <span className={classes.bullet}>•</span>;
    if (userCustom) {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Informações do usuário:
            </Typography>

            <Typography component="p">Nome: {userCustom.name}</Typography>
            <Typography component="p">E-mail: {userCustom.email}</Typography>
            <Typography component="p">Contato: {userCustom.contato}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={this.handleClickOpen}>
              Editar
            </Button>
          </CardActions>
        </Card>
      );
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Informações do usuário:
          </Typography>

          <Typography component="p">Nome: {user.displayName}</Typography>
          <Typography component="p">E-mail: {user.email}</Typography>
          <Typography component="p">Contato: {user.contato}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Editar</Button>
        </CardActions>
      </Card>
    );
  }

  renderDialogEdit() {
    const { open } = this.state;
    const { user, handleSubmit } = this.props;
    let nomeUser;
    let emailUser;

    if (user.userCustom) {
      nomeUser = user.userCustom.name;
      emailUser = user.userCustom.email;
    } else {
      nomeUser = user.displayName;
      emailUser = user.email;
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar contato</DialogTitle>
          <DialogContent>
            <DialogContentText>Nome:{nomeUser}</DialogContentText>
            <DialogContentText>E-mail:{emailUser}</DialogContentText>
            <Field
              name="contato"
              label="Contato"
              value="152"
              required
              component={TextInputBase}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fechar
            </Button>
            <Button onClick={handleSubmit(this.onSubmit)} color="primary">
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  render() {
    const { classes, user } = this.props;
    const { value, stateMessage } = this.state;

    if (!user) {
      return <Redirect to={ROUTER_HOME} />;
    }

    return (
      <div className={classes.root}>
        {stateMessage ? (
          <CustomizedSnackbars
            message={stateMessage}
            variant="success"
            onCleanMsg={this.onHandleChangeMessage}
          />
        ) : null}
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Info" />
            <Tab label="Lista" />
            <Tab label="Cadastro" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>{this.renderInfoUser()}</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {this.renderDialogEdit()}
      </div>
    );
  }
}

PerfilPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  onResetRedux: PropTypes.func.isRequired,
  message: PropTypes.string
};

PerfilPage.defaultProps = {
  message: null
};

const mapStateToProps = createStructuredSelector({
  user: selectorsSession.selectorSessionUser(),
  message: selectorsSession.selectorMessage()
});

const mapDispatchToProps = dispatch => ({
  onSignOutRequest: () => dispatch(SessionActions.signOutRequest()),
  updateRequest: payload => dispatch(SessionActions.updateRequest(payload)),
  onResetRedux: () => dispatch(SessionActions.resetRedux())
});

const validate = createValidator({
  contato: [required, phone]
});

const reduxFormPerfilEdit = reduxForm({ form: 'perfilEditPage', validate })(
  PerfilPage
);
const PerfilPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormPerfilEdit);

export default withStyles(styles, { withTheme: true })(PerfilPageRedux);
