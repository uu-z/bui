<template lang="pug">
  .object
    .field-label(@click="open = !open ")
      span.arrow(v-if="showArrow" :class="{right: true, rotated: open}")
      label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    .object-fields(
      v-if="open"
      v-for="(field, index) in Normal"
      :key="name + field.name + field.type + field.cType ")
      component(
        v-if="!['Array'].includes(field.cType)"
        :is="field.type"
        :value.sync="field.schema ? value : value[field.name]"
        :showArrow="field.schema"
        v-bind="field"
        @event="$emit('event', $event)"
        @click="updateEvent(field, $event)")
      Array(
        v-if="field.cType=='Array'"
        :schema.sync="field"
        :value.sync="field.schema ? value : value[field.name]"
        :defaultVal="field.default")
    Tabs(type="card" :animated="false" size="small" v-if="Tabs.length > 0")
      TabPane(
        v-for="(field, index) in Tabs"
        :key="field.name + field.type + field.cType "
        :label="field.label || field.name"
        :name="field.label || field.name")
        component(
          v-if="!['Array'].includes(field.cType)"
          :is="field.type"
          :value.sync="value"
          v-bind.sync="field"
          :showLabel="false"
          :showTabs="false"
          @click="updateEvent(field, $event)")
        Array(
          v-if="field.cType=='Array'"
          :key="field.name"
          :schema.sync="field"
          :value.sync="value"
          :defaultVal="field.default")
</template>


<script>
import _ from "lodash";

export default {
  name: "Object",
  data() {
    return {
      open: true
    };
  },
  props: {
    name: {},
    label: {},
    type: {},
    cType: {},
    vType: {
      default: "Normal"
    },
    showLabel: {
      default: true
    },
    showTabs: {
      default: false
    },
    showArrow: {},
    schema: {
      default() {
        return {};
      }
    },
    value: {
      default() {
        return {};
      }
    }
  },
  computed: {
    Normal() {
      return this.schema.filter(i => {
        return i.type !== "Object" || (i.vType === "Collapse" || !i.vType);
      });
    },
    Tabs() {
      return this.schema.filter(i => {
        return i.type === "Object" && i.vType === "Tabs";
      });
    }
  },
  methods: {
    updateEvent(field) {
      this.$emit("event", {
        callback: field
      });
    }
  }
};
</script>

<style lang="stylus">
.object
  .field-label
    position relative
    >.field-label-text
      margin-right 14px
      text-align right
  >.object-fields
    .field-label-text
      margin-right 14px
      text-align right
.object-fields
  width 100%
  min-width 200px
  min-height 25px
</style>
