import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
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
      path: "/g6",
      name: "g6",
      component: require("@/views/g6").default
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
});

export default router;
