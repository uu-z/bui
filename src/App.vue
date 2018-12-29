<template lang="pug">
  .home
    ul.menu
      li(v-for="menu in menus")
        router-link(:to="menu.to") {{menu.name}}
    router-view
</template>

<script>
import { request, mapVars, mapObjs } from "./utils";

export default {
  data() {
    return {
      menus: [{ name: "example", to: "example" }, { name: "g6", to: "g6" }]
    };
  },
  computed: {
    ...mapVars(["apiRoot"])
  },
  async mounted() {}
};
</script>

<style lang="stylus">
.menu
  z-index 9
  position absolute
.field
  display flex
  position relative
  .field-label-text
    margin-left 14px
.arrow
  display inline-block
  width 0
  height 0
  transition transform 0.1s ease
  margin-right 8px
  opacity 0.7
  position absolute
  top 7px
  left 0px
  transition transform 0.1s ease
  &.right
    border-top 4px solid transparent
    border-bottom 4px solid transparent
    border-left 6px solid #444
  &.rotated
    transform rotate(90deg)
</style>
