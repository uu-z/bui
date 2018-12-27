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
.arrow
  display inline-block
  width 0
  height 0
  transition transform 0.1s ease
  margin-right 8px
  opacity 0.7
  &.right
    border-top 4px solid transparent
    border-bottom 4px solid transparent
    border-left 6px solid #444
  &.rotated
    transform rotate(90deg)
</style>
