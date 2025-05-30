import { createStore } from 'vuex';
import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';
import authModule from './modules/auth';

const store = createStore({
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});

export default store;
