import { get as _get } from './api';

export async function getAll(state, showId) {
  state.loadingStates.episodes = true;
  try {
    const episodes = await _get(`shows/${showId}/episodes`);
    state.episodes.replace(episodes);

    state.errorStates.episodes = false;
  } catch (e) {
    state.errorStates.episodes = true;
  }
  state.loadingStates.episodes = false;
}

export async function get(state, episodeId) {
  state.loadingStates.episodeData[episodeId] = true;

  try {
    const episode = await _get(`episodes/${episodeId}`);

    const { episodes: oldEpisodes = [] } = state;
    const episodeKey = oldEpisodes.findIndex((ep) => ep._id === episode._id);

    if (episodeKey < 0) {
      return;
    }

    oldEpisodes[episodeKey] = episode;

    state.episodes.replace(oldEpisodes);
    state.errorStates.episodeData[episodeId] = false;
  } catch (e) {
    state.errorStates.episodeData[episodeId] = true;
  }

  state.loadingStates.episodeData[episodeId] = false;
}
