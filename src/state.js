import { observable, observe } from 'mobx';

const getFavourites = () => {
  const store = window.localStorage;
  const favourites = store.getItem('favourites');

  try {
    return JSON.parse(favourites) || [];
  } catch (e) {
    return [];
  }
};

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
  favourites = [];

  @observable
  loadingStates = {
    shows: false,
    showData: false,
    showLike: false,
    episodes: false,
    episodeData: observable.object(),
  };

  constructor() {
    this.favourites.replace(getFavourites());

    observe(this.favourites, (...args) => {
      const favourites = this.favourites.slice();
      const store = window.localStorage;

      store.setItem('favourites', JSON.stringify(favourites));
    });
  }

}

export default new State();
