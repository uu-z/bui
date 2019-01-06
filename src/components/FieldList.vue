<template lang="pug">
  draggable.fieldList(
    v-model="value"
    :options="dragOptions" )
    .draggable-item(
      v-for="(item, index) in value"
      :key="item.name")
      .draggable-field(
        @click="$emit('click:label',{index,field: item, parent: value})"
        @contextmenu.prevent="$emit('click:label',{index, field: item, parent: value})")
        span.arrow(v-if="item.schema" :class="{right: true, rotated: open}" @click="open = !open")
        span.draggable-field-label {{item.name}}
        Object(:schema.sync="schema" :value.sync="item")
      FieldList.field-sublist(
        v-if="open && item.schema"
        :value.sync="item.schema"
        @click:label="$emit('click:label', $event)")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "FieldList",
  props: ["value"],
  data() {
    return {
      dragOptions: {
        animation: 0,
        group: "description",
        ghostClass: "ghost"
      },
      open: true
    };
  },
  methods: {
    clickLabel() {}
  },
  computed: {
    schema() {
      return [
        {
          name: "type",
          type: "Enum",
          label: "Type",
          showLabel: false,
          enums: this.types
        },
        {
          name: "cType",
          type: "Enum",
          label: "cType",
          default: "Variable",
          showLabel: false,
          enums: this.cTypes
        }
      ];
    },
    ...mapVars(["types", "cTypes"])
  }
};
</script>

<style lang="stylus">
.object-builder
  .field-container
    .object-fields
      min-width 50px
      margin-left 10px
    .draggable-item
      position relative
      .draggable-field
        display flex
        margin-left 14px
        .draggable-field-label
          width 50px
        .object
          display flex
    .field-sublist
      margin-left 10px
</style>
