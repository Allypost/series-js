import { observable, runInAction } from 'mobx';
import Util from '../helpers/Util';
import { post as _post } from './api';

export async function login(state, { email, password, rememberMe }) {
  runInAction(() => {
    state.loadingStates.login = true;
  });
  try {
    const data = await _post('users/sessions', '', { email, password });

    const { token = null } = data;
    const { _id } = Util.parseJWT(token);
    const { localStorage } = window;

    if (rememberMe) {
      localStorage.setItem('token_location', 'localStorage');
    }

    runInAction(() => {
      Object.assign(
        state.user,
        observable({
          token,
          username: email,
          id: _id,
        })
      );

      state.errorStates.login = false;
    });

    return token;
  } catch (e) {
    runInAction(() => {
      state.errorStates.login = true;
    });
  } finally {
    runInAction(() => {
      state.loadingStates.login = false;
    });
  }

  return '';
}

export async function register(state, { email, password }) {
  runInAction(() => {
    state.loadingStates.register = true;
  });

  try {
    const data = await _post('users', '', { email, password });
    const success = !!data._id;
    runInAction(() => {
      state.errorStates.register = success;
    });

    return data;
  } catch (e) {
    runInAction(() => {
      state.errorStates.register = true;
    });
    return {};
  } finally {
    runInAction(() => {
      state.loadingStates.register = false;
    });
  }
}
