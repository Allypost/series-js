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

export async function get(state, episodeId) {
  runInAction(() => {
    state.loadingStates.episodeData[episodeId] = true;
  });

  try {
    const episode = await _get(`episodes/${episodeId}`);

    const { episodes: oldEpisodes = [] } = state;
    const episodeKey = oldEpisodes.findIndex((ep) => ep._id === episode._id);

    if (episodeKey < 0) {
      return;
    }

    oldEpisodes[episodeKey] = episode;

    runInAction(() => {
      state.episodes.replace(oldEpisodes);
      state.errorStates.episodeData[episodeId] = false;
    });
  } catch (e) {
    runInAction(() => {
      state.errorStates.episodeData[episodeId] = true;
    });
  }
  runInAction(() => {
    state.loadingStates.episodeData[episodeId] = false;
  });
}
