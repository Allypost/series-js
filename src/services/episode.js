import { runInAction } from 'mobx';
import { get as _get, post as _post } from './api';

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

export async function add(state, token, data) {
  runInAction(() => {
    state.loadingStates.addEpisode = true;
  });
  try {
    const episode = await _post('episodes', token, data);

    if (Array.isArray(episode)) {
      throw new Error(episode);
    }

    runInAction(() => {
      state.episodes.push(episode);
      state.errorStates.addEpisode = false;
    });

    return true;
  } catch (e) {
    runInAction(() => {
      state.errorStates.addEpisode = true;
    });
  }
  runInAction(() => {
    state.loadingStates.addEpisode = false;
  });

  return false;
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
