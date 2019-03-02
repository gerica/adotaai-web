import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  // GERAL
  resetRedux: [],
  success: ['message'],
  failure: ['error'],

  // CADASTRAR PET PARA DOAÇÃO
  cadastroDoacaoRequest: ['payload'],

  // ATUALIZAR PET
  updateDoacaoRequest: ['payload'],
  updateDoacaoInfoRequest: ['payload'],
  updateDoacaoInfoSuccess: ['done'],

  // RECUPERAR PET POR USUÁRIO
  fetchPetPorUserRequest: ['user'],
  fetchPetPorUserSuccess: ['listaPetPorUser'],

  fetchPetAbertoRequest: null,
  fetchPetAbertoSuccess: ['listaPetAberto']
});

export const PetTypes = Types;
export default Creators;
