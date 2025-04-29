import { createStore } from 'vuex';
import coachesModule from './modules/coaches';
// import requests from './modules/requests';

const store = createStore({
  modules: {
    coaches: coachesModule,
    // requests
  },
});

export default store;
