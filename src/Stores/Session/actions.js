import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({

    //Geral
    resetRedux: [],
    request: ['payload'],
    success: ['message'],
    failure: ['error'],

    // Login
    loginRequest: ['username', 'password'],
    loginSuccess: [],
    loginFailure: ['error'],

    // Signin Google
    signInGoogleRequest: [],
    signInGoogleSuccess: [],
    signInGoogleFailure: ['errorMessage'],

    // Signin manual
    signInRequest: ['payload'],

    // adicionar usuário
    addUser: ['user'],

    // SignOut
    signOutRequest: [],
    signOutSuccess: [],
    signOutFailure: ['errorMessage'],

    //Atualizar
    updateRequest: ['payload'],
});

export const SessionTypes = Types;
export default Creators;
