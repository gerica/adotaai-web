import { all } from 'redux-saga/effects';
import * as sessionSaga from './Session/saga';
import * as petSaga from './Pet/saga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    petSaga.watchCadastroDoacaoRequest(),
    petSaga.watchFetchPetPorUserRequest(),
    petSaga.watchFetchPetAbertoRequest(),
    petSaga.watchUpdateDoacaoRequest(),
    petSaga.watchUpdateDoacaoInfoRequest(),

    sessionSaga.watchLoginRequest(),
    sessionSaga.watchSignInGoogleRequest(),
    sessionSaga.watchSignOutRequest(),
    sessionSaga.watchUpdateRequest(),
    sessionSaga.watchSignInRequest()
  ]);
}
