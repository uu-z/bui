<template lang="pug">
  .home
    .menus
      router-link.menu(v-for="menu in menus" :key="menu.name" :to="menu.to") {{menu.name}}
    router-view
</template>

<script>
import { request, mapVars, mapObjs } from "./utils";
import { routes } from "./router";

export default {
  data() {
    return {
      menus: routes
        .filter(i => !["/", "*"].includes(i.path))
        .map(i => ({
          name: i.name,
          to: i.name
        }))
    };
  },
  computed: {
    ...mapVars(["apiRoot"])
  },
  async mounted() {}
};
</script>

<style lang="stylus">
.menus
  display flex
  .menu
    margin 10px
.field
  display flex
  position relative
  justify-content space-between
.field-label-text
  min-width 30px
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
.ivu-slider
  width 100%
.ivu-tabs
  position unset !important
</style>
