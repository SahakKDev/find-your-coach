import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didLogout: false,
    };
  },
  getters,
  mutations,
  actions,
};
