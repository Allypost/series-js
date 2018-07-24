import { runInAction } from 'mobx';
import { get as _get } from './api';

export async function getAll(state, episodeId) {
  runInAction(() => {
    state.loadingStates.comments = true;
  });
  try {
    const comments = await _get(`episodes/${episodeId}/comments`);
    runInAction(() => {
      state.comments.replace(comments);
      state.errorStates.comments = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.comments = true;
    });
  }
  runInAction(() => {
    state.loadingStates.comments = false;
  });
}
