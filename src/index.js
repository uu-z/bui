import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import axios from "axios";
import * as componens from "./components";

if (process.env.NODE_ENV != "prod") {
  window.axios = axios;
}
const Plugins = {};

const Components = {
  ...componens
};

for (let [key, value] of Object.entries(Components)) {
  Vue.component(key, value);
}
for (let [key, value] of Object.entries(Plugins)) {
  Vue.use(value);
}

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
