import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { workspace } from './workspace.module';
import { projects } from './projects.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    workspace,
    projects
  }
});