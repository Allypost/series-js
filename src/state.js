import { observable } from 'mobx';

class State {

  @observable
  shows = [];

  @observable
  users = [];

  @observable
  loadingStates = {
    shows: false,
  };
}

export default new State();
