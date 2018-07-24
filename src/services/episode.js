import { runInAction } from 'mobx';
import { get as _get } from './api';

export async function getAll(state, showId) {
  runInAction(() => {
    state.loadingStates.episodes = true;
  });
  try {
    const episodes = await _get(`shows/${showId}/episodes`);
    runInAction(() => {
      state.episodes.replace(episodes);
      state.errorStates.episodes = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.episodes = true;
    });
  }
  runInAction(() => {
    state.loadingStates.episodes = false;
  });
}

export async function comments(state, episodeId) {
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

async function getForList(state, episodeId) {
  runInAction(() => {
    state.loadingStates.episodesData[episodeId] = true;
  });

  try {
    const episode = await _get(`episodes/${episodeId}`);

    const { episodes: oldEpisodes = [] } = state;
    const episodeKey = oldEpisodes.findIndex((ep) => ep._id === episode._id);

    if (episodeKey < 0) {
      return;
    }

    const newEpisodes = oldEpisodes.slice();
    newEpisodes[episodeKey] = episode;

    runInAction(() => {
      state.episodes.replace(newEpisodes);
      state.errorStates.episodesData[episodeId] = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.episodesData[episodeId] = true;
    });
  }
  runInAction(() => {
    state.loadingStates.episodesData[episodeId] = false;
  });
}

async function getLocal(state, episodeId) {
  runInAction(() => {
    state.loadingStates.episodeData = true;
  });

  try {
    const episode = await _get(`episodes/${episodeId}`);
    runInAction(() => {
      Object.assign(state.episodeData, episode);
      state.errorStates.episodeData = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.episodeData = true;
    });
  }
  runInAction(() => {
    state.loadingStates.episodeData = false;
  });
}


export async function get(state, episodeId, forList = true) {
  if (forList) {
    return getForList(state, episodeId);
  }

  return getLocal(state, episodeId);
}
