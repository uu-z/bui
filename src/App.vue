<template lang="pug">
  .home
    ul
      li(v-for="menu in menus")
        router-link(:to="menu.to") {{menu.name}}
    router-view
</template>

<script>
import { request, mapVars, mapObjs } from "./utils";

export default {
  data() {
    return {
      menus: [{ name: "example", to: "example" }]
    };
  },
  computed: {
    ...mapVars(["apiRoot"])
  },
  async mounted() {}
};
</script>

<style lang="stylus">
</style>
