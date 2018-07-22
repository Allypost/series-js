import { observable } from 'mobx';
import { get as _get, post as _post } from './api';

export async function getAll(state) {
  state.loadingStates.shows = true;
  const shows = await _get('shows');
  state.loadingStates.shows = false;
  state.shows.replace(shows);
}

export async function get(state, showId) {
  state.loadingStates.showData = true;
  const show = await _get(`shows/${showId}`);
  state.showData = observable(show);
  state.loadingStates.showData = false;
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
