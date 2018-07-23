import { observable, observe, intercept, computed } from 'mobx';
import Util from './helpers/Util';

const getFavourites = () => {
  const store = window.localStorage;
  const favourites = store.getItem('favourites');

  try {
    return JSON.parse(favourites) || [];
  } catch (e) {
    return [];
  }
};

const updateShows = (oldAdded = [], favourites = []) => {
  const mapper =
    (episode) =>
      Object.assign(
        episode,
        {
          isFavourite: favourites.includes(episode._id),
        }
      );

  if (!Array.isArray(oldAdded)) {
    return [];
  }

  return oldAdded.map(mapper);
};

const interceptShows = (diff, favourites = []) => {
  const { added: oldAdded = [] } = diff;
  const added = updateShows(oldAdded, favourites);

  return Object.assign(diff, { added });
};

const updateShowData = (oldValue, favourites) => {
  const isFavourite = favourites.includes(oldValue._id);
  return Object.assign(oldValue, { isFavourite });
};

const interceptShowData = (diff, favourites = []) => {
  const { newValue: oldValue } = diff;
  const newValue = updateShowData(oldValue, favourites);

  return Object.assign(diff, { newValue });
};

const updateStore = (name, newVal = null) => {
  const location = localStorage.getItem('token_location');
  const store = window[location];

  if (!location || !store) {
    return;
  }

  if (newVal === null) {
    store.removeItem(name);
  } else {
    store.setItem(name, newVal);
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

  @observable
  errorStates = Object.assign({}, this.loadingStates);

  @observable
  user = Util.getUserData();

  @computed
  get isLoggedIn() {
    const { token } = this.user;

    return !!token;
  }

  constructor() {
    this.favourites.replace(getFavourites());

    observe(this.favourites, (...args) => {
      const { favourites } = this;
      const store = window.localStorage;

      Object.assign(this.showData, updateShowData(this.showData, favourites));
      this.shows.replace(updateShows(this.shows, favourites));

      store.setItem('favourites', JSON.stringify(favourites));
    });

    observe(this.user, ({ name, newValue, object }) => {
      switch (name) {
        case 'token':
        case 'username':
          updateStore(name, newValue);
          break;
        default:
          break;
      }

      if (!Object.keys(object).length) {
        localStorage.removeItem('token_location');
      }
    });

    intercept(this.shows, (diff) => interceptShows(diff, this.favourites));
    intercept(this, 'showData', (diff) => interceptShowData(diff, this.favourites));
  }

}

export default new State();
