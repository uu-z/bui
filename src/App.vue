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
*
  margin 0
  padding 0
.menus
  display flex
  .menu
    margin 10px
.field
  display flex
  position relative
  justify-content space-between
.arrow
  display inline-block
  width 0
  height 0
  transition transform 0.1s ease
  margin-right 8px
  opacity 0.7
  position absolute
  top 5px
  left 0px
  transition transform 0.1s ease
  &.right
    border-top 4px solid transparent
    border-bottom 4px solid transparent
    border-left 6px solid #444
  &.rotated
    transform rotate(90deg)
.field-label-text
  min-width 50px
.ivu-select
  width auto !important
.ivu-slider
  width 100%
.ivu-tabs
  position unset !important
  .ivu-tabs-tab
    padding 4px 8px !important
.ivu-tabs-bar
  margin-bottom 4px !important
.object > .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container
  height 26px
.object > .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab
  border-radius 0
  margin-right 0
  font-size 12px
  height 25px
</style>
