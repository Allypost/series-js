import { get as _get } from './api';

export async function getAll(state, showId) {
  state.loadingStates.episodes = true;
  const episodes = await _get(`shows/${showId}/episodes`);
  state.loadingStates.episodes = false;
  state.episodes.replace(episodes);
}

export async function get(state, episodeId) {
  const episode = await _get(`episodes/${episodeId}`);
  const { episodes: oldEpisodes = [] } = state;
  const episodeKey = oldEpisodes.findIndex((ep) => ep._id === episode._id);

  if (episodeKey < 0) {
    state.episodes.replace([...oldEpisodes, episode]);
    return;
  }

  oldEpisodes[episodeKey] = episode;

  state.episodes.replace(oldEpisodes);
}
