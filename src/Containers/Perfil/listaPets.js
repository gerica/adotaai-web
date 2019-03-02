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
  DialogActions,
  Tooltip
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { Pets } from '@material-ui/icons';
import { green, red, amber } from '@material-ui/core/colors';

import * as selectorsSession from '../../Stores/Session/selector';
import * as selectors from '../../Stores/Pet/selector';
import PetActions from '../../Stores/Pet/actions';
import CustomizedProgress from '../../Components/Progress/CustomizedProgress';
import { getMiniatura } from '../../Assets/Images';
import { ViewCards } from './styles';
import MyTheme from '../../muiTheme';
import { STATUS } from '../../Utils/constants';

const styles = theme => ({
  card: {
    maxWidth: 400,
    width: 350,
    height: 230,
    margin: 5
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
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
  },
  rightIcon: {
    fontSize: 14,
    paddingLeft: 2,
    marginLeft: 4
  },
  divStatusParent: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  divStatus: {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #00000038',
    borderRadius: 15,
    color: '#0000008c',
    width: 100
  }
});

class ListaPetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedObj: null
    };
  }

  componentWillMount() {
    const { fetchPetPorUserRequest, user } = this.props;
    fetchPetPorUserRequest(user);
  }

  shouldComponentUpdate(nextProps) {
    const { done, fetchPetPorUserRequest, user, onResetRedux } = nextProps;

    if (done) {
      this.setState({ open: false, selectedObj: null });
      onResetRedux();
      fetchPetPorUserRequest(user);
    }
    return true;
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

  renderStatus(obj) {
    const { classes } = this.props;

    if (!obj) {
      return null;
    }
    let iconStatus;
    let infoStatus;
    let color;
    let descricao;
    switch (obj.status) {
      case STATUS[0]: // ABERTO
        iconStatus = (
          <Icon name="circle-thin" style={{ fontSize: 20 }}>
            radio_button_unchecked
          </Icon>
        );
        infoStatus = 'Aberto';
        descricao = 'A doação está aberta.';
        break;
      case STATUS[1]: // FECHADO
        iconStatus = (
          <Icon
            style={{
              fontSize: 20
            }}
          >
            remove_circle_outline
          </Icon>
        );
        // eslint-disable-next-line prefer-destructuring
        color = amber[500];
        infoStatus = 'Fechado';
        descricao = 'A doação está fechada.';
        break;
      case STATUS[2]: // DOADO
        iconStatus = (
          <Icon
            style={{
              fontSize: 20
            }}
          >
            check_circle_outline
          </Icon>
        );
        // eslint-disable-next-line prefer-destructuring
        color = green[500];
        infoStatus = 'Doado';
        descricao = 'Foi feito a doação desse pet.';
        break;
      case STATUS[3]: // APAGADO
        iconStatus = (
          <Icon
            style={{
              fontSize: 20
            }}
          >
            remove_circle_outline
          </Icon>
        );
        // eslint-disable-next-line prefer-destructuring
        color = red[500];
        infoStatus = 'Apagado';
        descricao = 'Está doação foi apagada.';
        break;

      default:
        break;
    }

    return (
      <div className={classes.divStatusParent}>
        <Tooltip title={descricao}>
          <div className={classes.divStatus} style={{ backgroundColor: color }}>
            {iconStatus}
            {infoStatus}
          </div>
        </Tooltip>
      </div>
    );
  }

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
            <Typography component="p">
              Nome: {obj.nome} <br />
              Doador: {obj.user && obj.user.name}
            </Typography>
            {this.renderStatus(obj)}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {obj.status !== STATUS[2] ? (
              <Button
                variant="contained"
                style={MyTheme.palette.success}
                className={classes.button}
                onClick={() => this.handleClickOpen(obj)}
              >
                Editar
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <Icon className={classes.rightIcon}>edit</Icon>
              </Button>
            ) : null}
          </CardActions>
        </Card>
      ));
    }

    return cards;
  }

  renderDialogEdit() {
    const { classes, updateDoacaoInfoRequest } = this.props;
    const { open, selectedObj } = this.state;
    if (!selectedObj) {
      return null;
    }

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Editar Doação</DialogTitle>
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
                {selectedObj.status !== STATUS[0] && (
                  <Button
                    variant="contained"
                    style={MyTheme.palette.success}
                    className={classes.button}
                    onClick={() =>
                      updateDoacaoInfoRequest({
                        doacao: selectedObj,
                        status: STATUS[0]
                      })
                    }
                  >
                    Abrir
                    <Icon className={classes.rightIcon}>pets</Icon>
                  </Button>
                )}

                {selectedObj.status === 'aberto' && (
                  <Button
                    variant="contained"
                    style={MyTheme.palette.success}
                    className={classes.button}
                    onClick={() =>
                      updateDoacaoInfoRequest({
                        doacao: selectedObj,
                        status: STATUS[2]
                      })
                    }
                  >
                    Doado
                    <Icon className={classes.rightIcon}>pets</Icon>
                  </Button>
                )}

                {selectedObj.status === 'aberto' && (
                  <Button
                    variant="contained"
                    style={MyTheme.palette.warning}
                    className={classes.button}
                    onClick={() =>
                      updateDoacaoInfoRequest({
                        doacao: selectedObj,
                        status: STATUS[1]
                      })
                    }
                  >
                    Fechar
                    <Icon className={classes.rightIcon}>warning</Icon>
                  </Button>
                )}

                {(selectedObj.status === 'aberto' ||
                  selectedObj.status === 'fechado') && (
                  <Button
                    variant="contained"
                    style={MyTheme.palette.danger}
                    className={classes.button}
                    onClick={() =>
                      updateDoacaoInfoRequest({
                        doacao: selectedObj,
                        status: STATUS[3]
                      })
                    }
                  >
                    Apagar
                    <Icon className={classes.rightIcon}>delete</Icon>
                  </Button>
                )}
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

  render() {
    const { loading } = this.props;

    // console.log(error);

    return (
      <Fragment>
        {this.renderDialogEdit()}
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
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  updateDoacaoInfoRequest: PropTypes.func,
  onResetRedux: PropTypes.func,
  done: PropTypes.bool
};

ListaPetPage.defaultProps = {
  loading: null,
  error: null
};

const mapStateToProps = createStructuredSelector({
  listaPetPorUser: selectors.selectorListaPetPorUser(),
  loading: selectors.selectorLoading(),
  user: selectorsSession.selectorSessionUser(),
  error: selectors.selectorError(),
  done: selectors.selectorDone()
});

const mapDispatchToProps = dispatch => ({
  fetchPetPorUserRequest: user =>
    dispatch(PetActions.fetchPetPorUserRequest(user)),
  updateDoacaoInfoRequest: payload =>
    dispatch(PetActions.updateDoacaoInfoRequest(payload)),
  onResetRedux: () => dispatch(PetActions.resetRedux())
});

const ListaPetPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaPetPage);

export default withStyles(styles)(ListaPetPageRedux);
