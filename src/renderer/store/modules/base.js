const state = {
  metaData: {
    railElasticModulusE: "",
    expansionCoefficientRailLine: "",
    railAllowableStress: "",
    crossSectionArea: "",
    ix: "",
    iy: "",
    neutralAxisPosition: "",
    railHeadWidth: "",
    railBaseWidth: "",
    railHeight: "",
    w1: "",
    w2: "",
    d: "",
    a: "",
    u: "",
    k: "",
    designAxleLoad: "",
    curveRadius: ""
  }
};

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main--;
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.main++;
  },
  setData(state, data) {
    Object.entries(data).map(([key, value]) => {
      state.metaData[key] = value;
    });
    console.log(122222, state.metaData);
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit("INCREMENT_MAIN_COUNTER");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
