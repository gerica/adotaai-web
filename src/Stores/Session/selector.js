
import { createSelector } from 'reselect';

const storeSession = state => state.session;
const storeForm = state => state.form;

const selectorLoading = () => createSelector(storeSession, store => store.loading);
const selectorSessionUser = () => createSelector(storeSession, store => store.user);
const selectorError = () => createSelector(storeSession, store => store.errorMessage);
const selectorMessage = () => createSelector(storeSession, store => store.message);

const selectorForm = () => createSelector(storeForm, form => form);

export {
    selectorForm,
    selectorLoading,
    selectorError,
    selectorSessionUser,
    selectorMessage
};
