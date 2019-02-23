import { all } from 'redux-saga/effects';
import * as sessionSaga from './Session/saga';

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([

        sessionSaga.watchLoginRequest(),
        sessionSaga.watchSignInGoogleRequest(),
        sessionSaga.watchSignOutRequest(),
        sessionSaga.watchUpdateRequest(),
        sessionSaga.watchSignInRequest(),
    ]);
}
