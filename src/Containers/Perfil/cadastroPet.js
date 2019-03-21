import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, untouch } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Divider
} from '@material-ui/core';

import * as selectorsSession from '../../Stores/Session/selector';
// import { ContainerPetCadastro } from './styles';
import { createValidator, required } from '../../Utils/validation';
import racasCao from '../../Assets/Images/racasCao';
import racasGato from '../../Assets/Images/racasGato';
import PetActions from '../../Stores/Pet/actions';
import * as selectors from '../../Stores/Pet/selector';
import { tipos } from '../../Assets/Images';

import TextInputBase from '../../Components/Form/TextInputBase';
import { SpanButtonText } from '..';
import SelectBase from '../../Components/Form/SelectBase';
import MyTheme from '../../muiTheme';

const formName = 'cadastroPetPage';

const itensTipo = [
  { label: 'Cão', value: tipos[0] },
  { label: 'Gato', value: tipos[1] }
];
const itensSexo = [
  { label: 'Macho', value: 'macho' },
  { label: 'Femea', value: 'femea' }
];
const itensSN = [
  { label: 'Sim', value: 'sim' },
  { label: 'Não', value: 'nao' }
];
const itensPorte = [
  { label: 'Pequeno', value: 'Pequeno' },
  { label: 'Médio', value: 'Médio' },
  { label: 'Grande', value: 'Grande' }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  card: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  cardContent: {
    padding: theme.spacing.unit,
    width: '33%'
    // display: 'flex',
    // height: 650
  },
  containerFields: {
    display: 'flex'
    // width: 650
  },
  dialogContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  field: {
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CadastroPetPage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    const { reset, resetRedux } = this.props;
    reset();
    resetRedux();
  }

  shouldComponentUpdate(nextProps) {
    const { message, reset, resetRedux } = nextProps;

    if (message) {
      resetRedux();
      reset();
      return true;
    }
    return true;
  }

  onSubmit = values => {
    // console.log(values);
    const { cadastroDoacaoRequest, user } = this.props;
    const newObj = {
      createdAt: new Date(),
      updatedA: new Date(),
      user: user.userCustom,
      tipo: values.tipo.value,
      sexo: values.sexo.value,
      castrado: values.castrado.value,
      vermifugado: values.vermifugado.value,
      porte: values.porte.value,
      raca: values.raca.value,
      nome: values.nome,
      resumo: values.resumo,
      status: 'aberto'
    };
    // console.log({ newObj });
    cadastroDoacaoRequest(newObj);
  };

  onChangeTipo = () => {
    const { dispatch } = this.props;

    // reset the field's value
    dispatch(change(formName, 'raca', null));

    // reset the field's error
    dispatch(untouch(formName, 'raca'));
  };

  getRacas() {
    const { classes, formRedux } = this.props;
    let tipo;
    if (formRedux[formName] && formRedux[formName].values) {
      // eslint-disable-next-line prefer-destructuring
      tipo = formRedux[formName].values.tipo;
    }

    if (!tipo) {
      return (
        <Field
          id="raca"
          required
          className={classes.field}
          name="raca"
          label="Selecione a raça"
          options={[]}
          component={SelectBase}
        />
      );
    }

    let itensRaca = [];
    if (tipo.value === tipos[0]) {
      itensRaca = racasCao.map(e => ({ label: e.raca, value: e.raca }));
    } else {
      itensRaca = racasGato.map(e => ({ label: e.raca, value: e.raca }));
    }

    return (
      <Field
        id="raca"
        required
        className={classes.field}
        name="raca"
        label="Selecione a raça"
        options={itensRaca}
        component={SelectBase}
      />
    );
  }

  renderLoading() {
    const { classes, loading } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={loading}
      >
        <DialogTitle id="confirmation-dialog-title">Carregando</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <CircularProgress size={24} className={classes.buttonProgress} />
        </DialogContent>
      </Dialog>
    );
  }

  render() {
    const { classes, handleSubmit, loading } = this.props;

    return (
      <div>
        {this.renderLoading()}
        <div className={classes.containerFields}>
          <div className={classes.cardContent}>
            {/* <Typography component="p">Cadastro de novo Pet</Typography> */}
            <Field
              name="nome"
              label="Nome"
              className={classes.field}
              component={TextInputBase}
            />
            <Field
              name="resumo"
              label="Resumo"
              component={TextInputBase}
              className={classes.field}
            />
          </div>

          <div className={classes.cardContent}>
            <Field
              id="tipo"
              required
              className={classes.field}
              name="tipo"
              label="Selecione o tipo de pet"
              options={itensTipo}
              component={SelectBase}
              onCustomChange={this.onChangeTipo}
            />
            {this.getRacas()}
            <Field
              id="sexo"
              required
              className={classes.field}
              name="sexo"
              label="Selecione o sexo"
              options={itensSexo}
              component={SelectBase}
            />
          </div>
          <div className={classes.cardContent}>
            <Field
              id="castrado"
              required
              className={classes.field}
              name="castrado"
              label="Selecione se é castrado"
              options={itensSN}
              component={SelectBase}
            />
            <Field
              id="vermifugado"
              required
              className={classes.field}
              name="vermifugado"
              label="Selecione se é vermifugado"
              options={itensSN}
              component={SelectBase}
            />
            <Field
              id="porte"
              required
              className={classes.field}
              name="porte"
              label="Selecione qual o porte"
              options={itensPorte}
              component={SelectBase}
            />
          </div>
        </div>
        <Divider />
        <Button
          variant="contained"
          disabled={loading}
          style={MyTheme.palette.success}
          className={classes.button}
          onClick={handleSubmit(this.onSubmit)}
        >
          <SpanButtonText>Salvar</SpanButtonText>
        </Button>
      </div>
    );
  }
}

CadastroPetPage.propTypes = {
  user: PropTypes.object,
  formRedux: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  cadastroDoacaoRequest: PropTypes.func,
  resetRedux: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  message: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  user: selectorsSession.selectorSessionUser(),
  loading: selectors.selectorLoading(),
  message: selectors.selectorMessage(),
  error: selectors.selectorError(),
  formRedux: selectors.selectorForm()
});

const mapDispatchToProps = dispatch => ({
  cadastroDoacaoRequest: payload =>
    dispatch(PetActions.cadastroDoacaoRequest(payload)),
  resetRedux: () => dispatch(PetActions.resetRedux())
});

const validate = createValidator({
  nome: [required],
  resumo: [required],
  tipo: [required],
  sexo: [required],
  castrado: [required],
  vermifugado: [required],
  porte: [required],
  raca: [required]
});

const cadastroPetPageReduxForm = reduxForm({
  form: formName,
  validate
})(CadastroPetPage);

const cadastroPetPageRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(cadastroPetPageReduxForm);

export default withStyles(styles)(cadastroPetPageRedux);
