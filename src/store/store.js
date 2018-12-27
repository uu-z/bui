import Vue from "vue";
import _ from "lodash";
import store2 from "store2";
import config from "../config";

const state = {
  ...config,
  events: ["Hello"],
  ObjViewType: ["Tabs", "Collapsible", "Radio", "Block", "Simple"],
  types: ["Object", "String", "Enum", "Number", "Bool", "Variable", "Event", "Script"],
  cTypes: ["Variable", "Array"]
};

const mutations = {
  ASSIGN_STATE(state, payload) {
    for (let [k, v] of Object.entries(payload)) {
      state[k] = v;
    }
  },
  SET_STATE(state, payload) {
    for (let [k, v] of Object.entries(payload)) {
      _.set(state, k, v);
    }
  },
  CUSTOM(state, fn) {
    fn(state);
  }
};

const actions = {
  async INIT_APP({ dispatch, commit }) {}
};

export default {
  state,
  mutations,
  actions
};
