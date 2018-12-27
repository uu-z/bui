<template lang="pug">
  draggable(
    v-model="object.schema"
    :options="dragOptions" )
    .draggable-item(
      v-for="(item, index) in object.schema"
      :key="item.name")
      div.field-label(
        @click="$emit('click:label',{index,field: item, parent: object.schema})"
        @contextmenu.prevent="$emit('click:label',{index, field: item, parent: object.schema})")
        span.arrow(v-if="item.schema" :class="{right: true, rotated: open}" @click="open = !open")
        span {{item.name}}
      FieldList.field-sublist(
        v-if="open && item.schema"
        :object.sync="item"
        @click:label="$emit('click:label', $event)")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "FieldList",
  props: ["object"],
  data() {
    return {
      open: true
    };
  },
  methods: {
    clickLabel() {}
  },
  computed: {
    ...mapVars(["types"]),
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        ghostClass: "ghost"
      };
    }
  }
};
</script>


<style lang="stylus" scoped>
.draggable-item
  position relative
  .field-label
    display inline-block
    margin-left 14px
  .arrow
    position absolute
    top 7px
    left 0px
    transition transform 0.1s ease
.field-sublist
  margin-left 10px
</style>

