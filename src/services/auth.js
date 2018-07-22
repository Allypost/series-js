import { post as _post } from './api';

export async function login(state, { email, password, rememberMe }) {
  state.loadingStates.login = true;
  try {
    const data = await _post('users/sessions', '', { email, password });

    const { token } = data;
    const { localStorage } = window;

    const storeName = rememberMe ? 'localStorage' : 'sessionStorage';
    const store = window[storeName];

    store.setItem('token', token);
    store.setItem('username', email);
    localStorage.setItem('token_location', storeName);

    state.errorStates.login = false;

    return token;
  } catch (e) {
    state.errorStates.login = true;
  } finally {
    state.loadingStates.login = false;
  }

  return '';
}
