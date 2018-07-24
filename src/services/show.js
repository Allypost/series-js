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

async function interract(type, state, showId, token) {
  runInAction(() => {
    state.loadingStates.showLike = true;
  });

  try {
    const resp = await _post(`shows/${showId}/${type}`, token);
    runInAction(() => {
      Object.assign(state.showData, resp);
      state.errorStates.showLike = false;
      state.loadingStates.showLike = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.showLike = true;
    });
  } finally {
    runInAction(() => {
      state.loadingStates.showLike = false;
    });
  }
}

export async function like(state, showId, token) {
  interract('like', state, showId, token);
}

export async function dislike(state, showId, token) {
  interract('dislike', state, showId, token);
}
