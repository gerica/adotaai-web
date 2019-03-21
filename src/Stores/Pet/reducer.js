import { createReducer } from 'reduxsauce';
import { PetTypes } from './actions';

const INITIAL_STATE = {
  loading: false,
  listaPetPorUser: null,
  listaPetAberto: null,
  error: null,
  message: null,
  done: false
};

// Geral
export const request = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const success = (state = INITIAL_STATE, { message }) => ({
  ...state,
  loading: false,
  message
});
export const failure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  loading: false,
  error
});

// Cadastrar doação
export const cadastroDoacaoRequest = (state = INITIAL_STATE) => ({
  ...state,
  loading: true
});

// FETCH OS PETS
export const fetchPetPorUserSuccess = (
  state = INITIAL_STATE,
  { listaPetPorUser }
) => ({ ...state, loading: false, listaPetPorUser, error: null });

// Reset
export const resetRedux = (state = INITIAL_STATE) => ({
  ...state,
  error: null,
  message: null,
  done: false
});

export const fetchPetAbertoSuccess = (
  state = INITIAL_STATE,
  { listaPetAberto }
) => ({ ...state, listaPetAberto, loading: false });

export const updateDoacaoInfoSuccess = (state = INITIAL_STATE, { done }) => ({
  ...state,
  done
});

const perfilReducer = createReducer(INITIAL_STATE, {
  // RESET
  [PetTypes.RESET_REDUX]: resetRedux,
  [PetTypes.SUCCESS]: success,
  [PetTypes.FAILURE]: failure,

  // DOACAO
  [PetTypes.CADASTRO_DOACAO_REQUEST]: cadastroDoacaoRequest,
  [PetTypes.UPDATE_DOACAO_REQUEST]: request,
  [PetTypes.UPDATE_DOACAO_INFO_REQUEST]: request,
  [PetTypes.UPDATE_DOACAO_INFO_SUCCESS]: updateDoacaoInfoSuccess,

  // Fetch pet por usuario
  [PetTypes.FETCH_PET_POR_USER_REQUEST]: request,
  [PetTypes.FETCH_PET_POR_USER_SUCCESS]: fetchPetPorUserSuccess,

  // Fetch
  [PetTypes.FETCH_PET_ABERTO_REQUEST]: request,
  [PetTypes.FETCH_PET_ABERTO_SUCCESS]: fetchPetAbertoSuccess
});

export default perfilReducer;
