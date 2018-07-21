import { observable } from 'mobx';

class State {

  // eslint-disable-next-line
  @observable
  shows = [];

  @observable
  showData = {};

  @observable
  episodes = [];

  @observable
  users = [];

  @observable
  loadingStates = {
    shows: false,
    showData: false,
    showLike: false,
    episodes: false,
    episodeData: observable.object(),
  };
}

export default new State();
