import { observable } from 'mobx';
import { get as _get } from './api';

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
