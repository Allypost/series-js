import { runInAction } from 'mobx';
import { get as _get, post as _post, del as _del } from './api';

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

export async function post(state, episodeId, text) {
  runInAction(() => {
    state.loadingStates.commenting = true;
  });
  try {
    const { user } = state;
    const { token } = user;

    const comment = await _post('comments', token, { text, episodeId });
    const newComments = [comment, ...state.comments];

    runInAction(() => {
      state.comments.replace(newComments);
      state.errorStates.commenting = false;
    });

    return true;
  } catch (e) {
    runInAction(() => {
      state.errorStates.commenting = true;
    });

    return false;
  } finally {
    runInAction(() => {
      state.loadingStates.commenting = false;
    });
  }
}

export async function remove(state, commentId) {
  try {
    const { user } = state;
    const { token } = user;

    const success = await _del(`comments/${commentId}`, token);
    const newComments = state.comments.filter((comment) => comment._id !== commentId);

    runInAction(() => {
      state.comments.replace(newComments);
    });

    return success;
  } catch (e) {
    return false;
  }
}
