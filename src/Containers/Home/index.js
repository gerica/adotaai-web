/* eslint-disable prefer-destructuring */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
  CardActions,
  Icon,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';

import * as selectors from '../../Stores/Pet/selector';
import PetActions from '../../Stores/Pet/actions';
import CustomizedProgress from '../../Components/Progress/CustomizedProgress';
import { getMiniatura } from '../../Assets/Images';
import { ViewCards } from './styles';
import CustomizedSnackbars from '../../Components/Snackbars/CustomizedSnackbars';
import MyTheme from '../../muiTheme';

const styles = theme => ({
  card: {
    maxWidth: 400,
    width: 350,
    height: 210,
    margin: 5
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    // backgroundColor: red[500]
  }
});

// import AdaptingHook from '../../Components/Button/AdaptingHook';
// import { Container } from './styles';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedObj: null
    };
  }

  componentWillMount() {
    const { fetchPetAbertoRequest, reset } = this.props;
    fetchPetAbertoRequest();
    reset();
  }

  getRacaDescricao(raca) {
    if (raca) {
      return raca.length > 100 ? `${raca.substr(0, 10)}...` : raca;
    }
    return '';
  }

  getAvatar(doador) {
    const { classes } = this.props;
    if (!doador) {
      return <Icon type="MaterialIcons" name="pets" />;
    }
    const objImg = getMiniatura(doador);
    if (objImg) {
      return (
        <Avatar
          aria-label="Recipe"
          className={classes.avatar}
          src={objImg.img}
        />
      );
    }
    return <Icon type="MaterialIcons" name="pets" />;
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClickOpen = obj => {
    this.setState({ open: true, selectedObj: obj });
  };

  handleClose = () => {
    this.setState({ open: false, selectedObj: null });
  };

  handleWhatsApp = contato => {
    if (contato) {
      const text = 'Gostaria de adotar seu pet.';
      const link = `https://api.whatsapp.com/send?phone=55${contato}&text=${text}`;
      window.open(link, '_blank');
    }
  };

  renderDialogView() {
    const { classes } = this.props;
    const { open, selectedObj } = this.state;

    if (!selectedObj) {
      return null;
    }

    const { user } = selectedObj;
    let contato;
    if (user) {
      contato = user.contato;
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Adotar esse pet.</DialogTitle>
          <DialogContent>
            <Card className={classes.card}>
              <CardHeader
                avatar={this.getAvatar(selectedObj)}
                title={this.getRacaDescricao(selectedObj.raca)}
              />

              <CardContent>
                <Typography component="p">Nome: {selectedObj.nome}</Typography>
                <Typography component="p">
                  Doador: {selectedObj.user && selectedObj.user.name}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <Button
                  variant="contained"
                  style={MyTheme.palette.success}
                  className={classes.button}
                  onClick={() => this.handleWhatsApp(contato)}
                >
                  Contactar
                  <Icon className={classes.rightIcon}>arrow_forward</Icon>
                </Button>
              </CardActions>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  renderCards() {
    const { classes, listaPetAberto } = this.props;

    let cards;

    if (listaPetAberto && listaPetAberto.length > 0) {
      cards = listaPetAberto.map((obj, index) => (
        <Card className={classes.card} key={index}>
          <CardHeader
            avatar={this.getAvatar(obj)}
            title={this.getRacaDescricao(obj.raca)}
          />

          <CardContent>
            <Typography component="p">Nome: {obj.nome}</Typography>
            <Typography component="p">
              Doador: {obj.user && obj.user.name}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              variant="contained"
              style={MyTheme.palette.success}
              className={classes.button}
              onClick={() => this.handleClickOpen(obj)}
            >
              Ver
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon className={classes.rightIcon}>arrow_forward</Icon>
            </Button>
          </CardActions>
        </Card>
      ));
    }

    return cards;
  }

  render() {
    const { loading, error } = this.props;

    return (
      <Fragment>
        {this.renderDialogView()}
        {/* <CustomizedSnackbars message="teste" variant="success" /> */}
        {error ? (
          <CustomizedSnackbars message={error.message} variant="error" />
        ) : null}
        {loading ? <CustomizedProgress /> : null}
        <ViewCards>{this.renderCards()}</ViewCards>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  fetchPetAbertoRequest: PropTypes.func,
  loading: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // listaPetAberto: PropTypes.checkPropTypes(PropTypes.array),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

HomePage.defaultProps = {
  fetchPetAbertoRequest: null,
  loading: null,
  // listaPetAberto: [],
  error: null
};

const mapStateToProps = createStructuredSelector({
  listaPetAberto: selectors.selectorListaPetAberto(),
  // form: selectors.selectorForm(),
  loading: selectors.selectorLoading(),
  error: selectors.selectorError()
});

const mapDispatchToProps = dispatch => ({
  fetchPetAbertoRequest: () => dispatch(PetActions.fetchPetAbertoRequest()),
  reset: () => dispatch(PetActions.resetRedux())
});

const HomePageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default withStyles(styles)(HomePageRedux);
