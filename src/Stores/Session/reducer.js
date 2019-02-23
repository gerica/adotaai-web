/* eslint-disable max-len */
import { createReducer } from 'reduxsauce';
// import { fromJS } from 'immutable';
// import { concat } from 'lodash';
import { SessionTypes } from './actions';

const INITIAL_STATE = {
    user: undefined,
    error: undefined,
    loading: false,
    message: undefined,
};

// GERAL
export const request = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const success = (state = INITIAL_STATE, { message }) => ({ ...state, message, loading: false, error: null });
export const failure = (state = INITIAL_STATE, { error }) => ({ ...state, loading: false, error });

//Signing google
export const signInGoogleRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const signInGoogleSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, error: null });
export const signInGoogleFailure = (state = INITIAL_STATE, { error }) => ({ ...state, loading: false, error });

// adicionar usuário
export const addUser = (state = INITIAL_STATE, { user }) => ({ ...state, user });

// SignOut
export const signOutRequest = (state = INITIAL_STATE) => ({ ...state, loading: true });
export const signOutSuccess = (state = INITIAL_STATE) => ({ ...state, loading: false, user: null });
export const signOutFailure = (state = INITIAL_STATE, { error }) => ({ ...state, user: null, error, loading: false });

export const resetRedux = (state = INITIAL_STATE) => ({ ...state, loading: false, error: null, message: null });

const sessionReducer = createReducer(INITIAL_STATE, {
    // geral
    [SessionTypes.REQUEST]: request,
    [SessionTypes.SUCCESS]: success,
    [SessionTypes.FAILURE]: failure,
    [SessionTypes.RESET_REDUX]: resetRedux,

    // Login
    [SessionTypes.LOGIN_REQUEST]: request,

    // Sigin Google
    [SessionTypes.SIGN_IN_GOOGLE_REQUEST]: signInGoogleRequest,
    [SessionTypes.SIGN_IN_GOOGLE_SUCCESS]: signInGoogleSuccess,
    [SessionTypes.SIGN_IN_GOOGLE_FAILURE]: signInGoogleFailure,

    // adicionar usuário
    [SessionTypes.ADD_USER]: addUser,

    // SignOut
    [SessionTypes.SIGN_OUT_REQUEST]: signOutRequest,
    [SessionTypes.SIGN_OUT_SUCCESS]: signOutSuccess,
    [SessionTypes.SIGN_OUT_FAILURE]: signOutFailure,

    // Atualizar 
    [SessionTypes.UPDATE_REQUEST]: request,

    //Signin manual
    [SessionTypes.SIGN_IN_REQUEST]: request,
});

export default sessionReducer;
