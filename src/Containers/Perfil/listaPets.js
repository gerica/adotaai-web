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
  Avatar
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { Pets } from '@material-ui/icons';

import * as selectorsSession from '../../Stores/Session/selector';
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
    // display: 'flex',
    // justifyContent: 'center'
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
  },
  cardContent: {
    padding: 10
  }
});

class ListaPetPage extends Component {
  componentWillMount() {
    const { fetchPetPorUserRequest, user } = this.props;
    fetchPetPorUserRequest(user);
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

  renderCards() {
    const { classes, listaPetPorUser } = this.props;

    let cards;

    if (!listaPetPorUser || listaPetPorUser.length === 0) {
      cards = (
        <Card className={classes.card}>
          <CardHeader avatar={<Pets />} title="Faça a doação do seu pet." />

          <CardContent className={classes.cardContent}>
            <Typography>
              Caso você não possa ter mais seu pet, por algum motivo pessoal,
              tipo mudança ou qualquer outro motivo. Dow. Tem sempre um lar
              esperando por ele.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button size="small">
              Doe
              <Icon className={classes.rightIcon}>done</Icon>
            </Button>
          </CardActions>
        </Card>
      );
    }

    if (listaPetPorUser && listaPetPorUser.length > 0) {
      cards = listaPetPorUser.map((obj, index) => (
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

    // console.log(error);

    return (
      <Fragment>
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

ListaPetPage.propTypes = {
  loading: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  fetchPetPorUserRequest: PropTypes.func,
  user: PropTypes.object,
  listaPetPorUser: PropTypes.array,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

ListaPetPage.defaultProps = {
  loading: null,
  error: null
};

const mapStateToProps = createStructuredSelector({
  listaPetPorUser: selectors.selectorListaPetPorUser(),
  loading: selectors.selectorLoading(),
  user: selectorsSession.selectorSessionUser(),
  error: selectors.selectorError()
});

const mapDispatchToProps = dispatch => ({
  fetchPetPorUserRequest: user =>
    dispatch(PetActions.fetchPetPorUserRequest(user))
});

const ListaPetPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaPetPage);

export default withStyles(styles)(ListaPetPageRedux);
