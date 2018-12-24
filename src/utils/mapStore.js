import _ from "lodash";
import store from "../store";

export const mapVars = keys =>
  _.zipObject(
    keys,
    keys.map(key => ({
      get() {
        return _.get(store.state, key, {});
      },
      set(val) {
        store.commit("ASSIGN_STATE", {
          [key]: val
        });
      }
    }))
  );

export const mapObjs = keys =>
  _.zipObject(
    keys,
    keys.map(key => ({
      get() {
        return _.get(store.state, key, {});
      },
      set(val) {
        store.commit("CUSTOM", state => {
          let target = _.get(store.state, key, {});
          _.set(store.state, key, {
            ...target,
            ...val
          });
        });
      }
    }))
  );
