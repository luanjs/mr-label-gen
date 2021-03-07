import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const allowedTribes = ['intelligence', 'responding'];

export default new Vuex.Store({
  state: {
    isMrPage: false,
    mrTitle: '',
    activeUrl: '',
    isFrontMR: false,
    activeIcon: 'kayran',
    activeTribes: {
      responding: true,
      intelligence: false,
    },
    radioIcons: [
      {
        iconName: 'thumbsup',
        radioName: 'scales',
        url: require('../assets/thumbsup.gif'),
      },
      {
        iconName: 'kayran',
        radioName: 'scales',
        url: require('../assets/kayran.png'),
      },
      {
        iconName: 'madruga',
        radioName: 'scales',
        url: require('../assets/madruga.png'),
      },
      {
        iconName: 'rocket',
        radioName: 'scales',
        url: require('../assets/rocket.png'),
      },
      {
        iconName: 'master',
        radioName: 'scales',
        url: require('../assets/master.gif'),
      },
    ],
  },
  mutations: {
    SET_ACTIVE_ICON(state, payload) {
      const { activeIcon } = payload;
      state.activeIcon = activeIcon;
    },
    SET_ACTIVE_URL(state, payload) {
      const { activeUrl } = payload;
      state.activeUrl = activeUrl;
    },
    SET_IS_MR_PAGE(state, payload) {
      const { isMrPage } = payload;
      state.isMrPage = isMrPage;
    },
    SET_MR_TITLE(state, payload) {
      const { mrTitle } = payload;
      state.mrTitle = mrTitle;
    },
    SET_IS_FRONT_MR(state, payload) {
      const { isFrontMR } = payload;
      state.isFrontMR = isFrontMR;
    },
    SET_ACTIVE_TRIBE(state, payload) {
      const { tribe, status } = payload;

      if (!allowedTribes.includes(tribe)) return;

      const { activeTribes } = state;
      activeTribes[tribe] = status;
      console.log(activeTribes);
      state.activeTribe = activeTribes;
    },
    SET_DIRECT_ACTIVE_TRIBE(state, payload) {
      const { activeTribes } = payload;
      state.activeTribes = activeTribes;
    },
  },
  actions: {
    requestData({ commit, dispatch }) {
      chrome.tabs.executeScript({
        code: 'window.location.href',
      }, (results) => {
        if (results[0].includes('gitlab-enterprise') && results[0].includes('merge_requests/')) {
          commit('SET_IS_MR_PAGE', { isMrPage: true });
          commit('SET_ACTIVE_URL', { activeUrl: results[0] });
        } else {
          commit('SET_IS_MR_PAGE', { isMrPage: false });
        }

        dispatch('loadStorage');

        if (results[0].includes('front')) {
          commit('SET_IS_FRONT_MR', { isFrontMR: true });
        }
      });

      chrome.tabs.executeScript({
        code: 'document.querySelector(".qa-title").textContent',
      }, (results) => {
        const mrTitle = (results[0]);
        commit('SET_MR_TITLE', { mrTitle });
      });
    },
    saveStorage({ state }) {
      const MR = (JSON.stringify(state));
      localStorage.setItem('MR', MR);
    },
    loadStorage({ commit }) {
      if (localStorage.MR) {
        const MR = JSON.parse(localStorage.MR);
        const {
          isMrPage,
          isFrontMR,
          activeIcon,
          activeTribes,
        } = MR;

        commit('SET_IS_MR_PAGE', { isMrPage });
        commit('SET_IS_FRONT_MR', { isFrontMR });
        commit('SET_ACTIVE_ICON', { activeIcon });
        commit('SET_DIRECT_ACTIVE_TRIBE', { activeTribes });
      }
    },
  },
  modules: {
  },
});
