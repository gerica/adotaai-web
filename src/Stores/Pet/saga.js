import { takeLatest, all, call, put } from 'redux-saga/effects';
import PetActions, { PetTypes } from './actions';
import FbListaDoacaoService from '../../Service/FbListaDoacaoService';
import { MSG_001 } from '../../Utils/constants';

/**
 * Adicionar uma doação
 * @param {pet para doação} action
 */
function* cadastroDoacaoRequest({ payload }) {
  try {
    yield call([FbListaDoacaoService, FbListaDoacaoService.save], payload);
    const values = yield call([
      FbListaDoacaoService,
      FbListaDoacaoService.fetchAll
    ]);
    yield put(PetActions.fetchPetAbertoRequest(values));
    yield put(PetActions.success(MSG_001));
  } catch (err) {
    yield put(PetActions.failure(err));
  }
}

/**
 * Atualizar informações da doação
 * @param {*} param0
 */
function* updateDoacaoRequest({ payload }) {
  try {
    yield call([FbListaDoacaoService, FbListaDoacaoService.update], {
      payload
    });
    // yield call([FbListaDoacaoService, FbListaDoacaoService.save], payload);
    // const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
    // yield put(PetActions.fetchPetAbertoRequest(values));
    yield put(PetActions.success(MSG_001));
  } catch (err) {
    yield put(PetActions.failure(err));
  }
}

/**
 *
 * @param {*} param0
 */
function* updateDoacaoInfoRequest({ payload }) {
  try {
    yield call([FbListaDoacaoService, FbListaDoacaoService.updateInfo], {
      payload
    });
    // yield call([FbListaDoacaoService, FbListaDoacaoService.save], payload);
    // const values = yield call([FbListaDoacaoService, FbListaDoacaoService.fetchAll]);
    // yield put(PetActions.fetchPetAbertoRequest(values));
    yield put(PetActions.updateDoacaoInfoSuccess(true));
    yield put(PetActions.success(MSG_001));
  } catch (err) {
    yield put(PetActions.failure(err));
  }
}

/**
 * Recuperar pet por usuário
 * @param {user} param0
 */
function* fetchPetPorUserRequest({ user }) {
  try {
    const values = yield call(
      [FbListaDoacaoService, FbListaDoacaoService.fetchByUser],
      user
    );
    yield put(PetActions.fetchPetPorUserSuccess(values));
  } catch (err) {
    yield put(PetActions.failure(err));
  }
}

/**
 * Recuperar todas as doações em aberto
 */
function* fetchPetAbertoRequest() {
  try {
    const values = yield call([
      FbListaDoacaoService,
      FbListaDoacaoService.fetchAll
    ]);
    yield put(PetActions.fetchPetAbertoSuccess(values));
  } catch (err) {
    yield put(PetActions.failure(err));
  }
}

// function* getImagemPet(payload) {
//     try {
//         const ref = firebase.storage().ref(payload.object.imagem);
//         const response = yield call([ref, ref.getDownloadURL]);
//         yield put(HomeActions.getImagemPetSuccess(payload.object.pessoaDoadora, response));
//     } catch (err) {
//         yield put(HomeActions.getImagemPetFailure(payload.object.pessoaDoadora, err));
//     }
// }

export function* watchFetchPetAbertoRequest() {
  yield takeLatest(PetTypes.FETCH_PET_ABERTO_REQUEST, fetchPetAbertoRequest);
}

export function* watchCadastroDoacaoRequest() {
  yield takeLatest(PetTypes.CADASTRO_DOACAO_REQUEST, cadastroDoacaoRequest);
}

export function* watchFetchPetPorUserRequest() {
  yield takeLatest(PetTypes.FETCH_PET_POR_USER_REQUEST, fetchPetPorUserRequest);
}

export function* watchUpdateDoacaoRequest() {
  yield takeLatest(PetTypes.UPDATE_DOACAO_REQUEST, updateDoacaoRequest);
}

export function* watchUpdateDoacaoInfoRequest() {
  yield takeLatest(
    PetTypes.UPDATE_DOACAO_INFO_REQUEST,
    updateDoacaoInfoRequest
  );
}

export default function* petSaga() {
  yield all([
    watchCadastroDoacaoRequest(),
    watchFetchPetPorUserRequest(),
    watchFetchPetAbertoRequest(),
    watchUpdateDoacaoRequest(),
    watchUpdateDoacaoInfoRequest()
  ]);
}
