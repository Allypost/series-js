import { observable, runInAction } from 'mobx';
import { get as _get, post as _post } from './api';

export async function getAll(state) {
  runInAction(() => {
    state.loadingStates.shows = true;
  });
  try {
    const shows = await _get('shows');
    runInAction(() => {
      state.shows.replace(shows);
      state.errorStates.shows = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.shows = true;
    });
  }
  runInAction(() => {
    state.loadingStates.shows = false;
  });
}

export async function get(state, showId) {
  runInAction(() => {
    state.loadingStates.showData = true;
  });
  try {
    const show = await _get(`shows/${showId}`);
    runInAction(() => {
      state.showData = observable(show);
      state.errorStates.showData = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.showData = true;
    });
  }
  runInAction(() => {
    state.loadingStates.showData = false;
  });
}

export async function like(state, showId, token) {
  state.loadingStates.showLike = true;

  /*
  const resp = await _post(`shows/${showId}/like`, token);
  Object.assign(state.showData, resp);
  state.loadingStates.showLike = false;
  */

  const delay = 100 + (1000 * Math.random());
  return new Promise((resolve) => {
    setTimeout(() => {
      state.loadingStates.showLike = false;
      const diff = observable({ likesCount: (state.showData.likesCount || 0) + 1 });
      const newData = Object.assign(state.showData, diff);
      resolve(Object.assign({}, newData));
    }, delay);
  });
}

export async function dislike(state, showId, token) {
  state.loadingStates.showLike = true;

  /*
  const resp = await _post(`shows/${showId}/dislike`, token);
  Object.assign(state.showData, resp);
  state.loadingStates.showLike = false;
  */

  const delay = 100 + (1000 * Math.random());
  return new Promise((resolve) => {
    setTimeout(() => {
      state.loadingStates.showLike = false;
      const diff = observable({ likesCount: (state.showData.likesCount || 0) - 1 });
      const newData = Object.assign(state.showData, diff);
      resolve(Object.assign({}, newData));
    }, delay);
  });
}
