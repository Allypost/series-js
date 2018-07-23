import { observable } from 'mobx';
import Util from '../helpers/Util';
import { post as _post } from './api';

export async function login(state, { email, password, rememberMe }) {
  state.loadingStates.login = true;
  try {
    const data = await _post('users/sessions', '', { email, password });

    const { token = null } = data;
    const { _id } = Util.parseJWT(token);
    const { localStorage } = window;

    const storeName = rememberMe ? 'localStorage' : 'sessionStorage';
    const store = window[storeName];

    store.setItem('token', token);
    store.setItem('username', email);
    localStorage.setItem('token_location', storeName);

    Object.assign(
      state.user,
      observable({
        token,
        username: email,
        id: _id,
      })
    );

    state.errorStates.login = false;

    return token;
  } catch (e) {
    state.errorStates.login = true;
  } finally {
    state.loadingStates.login = false;
  }

  return '';
}

export async function register(state, { email, password }) {
  state.loadingStates.register = true;

  try {
    const data = await _post('users', '', { email, password });
    const success = !!data._id;
    state.errorStates.register = success;
    
    return data;
  } catch (e) {
    state.errorStates.register = true;
    return {};
  } finally {
    state.loadingStates.register = false;
  }
}
