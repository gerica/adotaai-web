import { takeLatest, all, call, put } from 'redux-saga/effects';
import SessionActions, { SessionTypes } from './actions';
import FbSessionService from '../../Service/FbSessionService';
import FbUsuarioService from '../../Service/FbUsuarioService';
// import GoogleSigninService from '../../Service/GoogleSigninService';
import { MSG_001 } from '../../Utils/constants';

/**
 * Sair da aplicação
 */
function* signOutRequest() {
    try {
        yield call([FbSessionService, FbSessionService.signOut]);
        yield put(SessionActions.signOutSuccess());
    } catch (err) {
        yield put(SessionActions.signOutFailure(err));
    }
}

/**
 * Alterar informações do usuário
 * @param {usuario} action 
 */
function* updateRequest({ payload }) {
    try {
        yield call([FbUsuarioService, FbUsuarioService.update], payload);
        const { user, dados } = payload;
        user.userCustom.contato = dados.contato;

        yield put(SessionActions.addUser(user));
        yield put(SessionActions.success(MSG_001));
    } catch (err) {
        console.log(err);
        yield put(SessionActions.failure(err));
    }
}

/**
 * Logar na aplicação
 * @param {email, password} payload 
 */
function* loginRequest(payload) {
    try {
        const { user } = yield call([FbSessionService, FbSessionService.login], payload);
        const userCustom = yield call([FbUsuarioService, FbUsuarioService.getByIdUser], user);
        // eslint-disable-next-line no-underscore-dangle
        const newUser = { ...user._user, userCustom };
        user.userCustom = userCustom;

        yield put(SessionActions.addUser(newUser));
        yield put(SessionActions.success());
    } catch (err) {
        yield put(SessionActions.failure(err));
    }
}

/**
 * Signing pela conta do google
 */
function* signInGoogleRequest() {
    try {
        // const { user } = yield call([GoogleSigninService, GoogleSigninService.signIn]);
        // let userCustom = yield call([FbUsuarioService, FbUsuarioService.getByIdUser], user);
        // if (!userCustom) {
        //     userCustom = yield* criarUserCustom(user);
        // }
        // user.userCustom = userCustom;
        // yield put(SessionActions.addUser(user));
        // yield put(SessionActions.signInGoogleSuccess());
    } catch (err) {
        yield put(SessionActions.loginFailure(err));
    }
}

/**
 * Signin manual
 * @param {email, password, nome, contato} param0 
 */
function* signInRequest({ payload }) {
    try {
        // console.log({ payload });
        yield call([FbSessionService, FbSessionService.signIn], payload);
        yield call([FbSessionService, FbSessionService.update], payload);
        const { _user } = yield call([FbSessionService, FbSessionService.refresh]);
        const userCustom = yield* criarUserCustom(_user, payload);
        _user.userCustom = userCustom;

        yield put(SessionActions.addUser(_user));
        yield put(SessionActions.success(MSG_001));
    } catch (err) {
        yield put(SessionActions.failure(err));
    }
}

function* criarUserCustom(user, payload) {
    const docUser = {
        createdAt: new Date(),
        updatedA: new Date(),
        id: user.uid || user.id,
        name: user.displayName || user.name,
        email: user.email,
        contato: payload && payload.contato,
        photo: user.photo || user.photoURL
    };
    return yield call([FbUsuarioService, FbUsuarioService.save], docUser);
}

export function* watchLoginRequest() {
    yield takeLatest(SessionTypes.LOGIN_REQUEST, loginRequest);
}

export function* watchSignOutRequest() {
    yield takeLatest(SessionTypes.SIGN_OUT_REQUEST, signOutRequest);
}

export function* watchUpdateRequest() {
    yield takeLatest(SessionTypes.UPDATE_REQUEST, updateRequest);
}

export function* watchSignInGoogleRequest() {
    yield takeLatest(SessionTypes.SIGN_IN_GOOGLE_REQUEST, signInGoogleRequest);
}

export function* watchSignInRequest() {
    yield takeLatest(SessionTypes.SIGN_IN_REQUEST, signInRequest);
}

export default function* sessionSaga() {
    yield all([
        watchLoginRequest(),
        watchSignInGoogleRequest(),
        watchSignOutRequest(),
        watchUpdateRequest(),
        watchSignInRequest(),
    ]);
}
