<template lang="pug">
  draggable.fieldList(
    v-model="object.schema"
    :options="dragOptions" )
    .draggable-item(
      v-for="(item, index) in object.schema"
      :key="item.name")
      .draggable-field(
        @click="$emit('click:label',{index,field: item, parent: object.schema})"
        @contextmenu.prevent="$emit('click:label',{index, field: item, parent: object.schema})")
        span.arrow(v-if="item.schema" :class="{right: true, rotated: open}" @click="open = !open")
        span.draggable-field-label {{item.name}}
        Object(:schema="schema" :value.sync="item")
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
