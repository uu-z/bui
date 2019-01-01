import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export const routes =  [
    {
      path: "/",
      name: "home",
      component: require("@/views/home").default
    },
    {
      path: "/example",
      name: "example",
      component: require("@/views/example").default
    },
    {
      path: "/editor",
      name: "editor",
      component: require("@/views/editor").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]

const router = new Router({
  routes
});

export default router;
