<template lang="pug">
  .array
    .field
      .field-label(@click="handleOpen")
        span.arrow(:class="{right: true, rotated: schema.open}")
        label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{schema.label || schema.name}}
      .field-action
        Button.add(size="small" @click="add") +
    draggable.fieldList(
      v-if="schema.open"
      v-model="_value"
      :options="dragOptions" )
      .draggable-item(v-for="(item, index) in value" :key="index")
        Icon.listIcon(size="12" type="md-list")
        .draggable-field
          component(
          :is="schema.type"
          :value.sync="value[index]"
          :showLabel="false"
          :showSlider="false"
          :style="schema.style"
          v-bind="schema")
        Button.remove(size="small" @click="remove(index)")  -
</template>

<script>
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "Array",
  data() {
    return {
      dragOptions: {
        animation: 0,
        group: "description",
        ghostClass: "ghost"
      }
    };
  },
  props: {
    schema: {},
    defaultVal: {
      default() {
        return [];
      }
    },
    value: {},
    showLabel: {
      default: true
    }
  },
  computed: {
    ...mapVars(["defaultValue"]),
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:value", val);
      }
    }
  },
  methods: {
    handleOpen() {
      this.$set(this.schema, "open", !this.schema.open);
      this.$forceUpdate();
    },
    add() {
      const value = _.get(this.defaultValue, this.schema.type, {});
      this.value.push(value);
    },
    remove(index) {
      this.$delete(this.value, index);
    }
  }
};
</script>

<style lang="stylus">
.array
  .object[ctype='Array']
    >.object-schemas
      margin-left 0
  .fieldList, .schemaList
    margin-left 14px
  .listIcon
    line-height 2
    margin-right 2px
    &:hover
      cursor move
  .field-label
    >.field-label-text
      margin-left 14px
  .draggable-item
    display flex
    margin 2px 0
  .remove
    margin-left 10px
</style>


