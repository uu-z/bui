<template lang="pug">
  .object
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    Tabs(type="line" :animated="false" size="small" v-if="Tabs.length > 0")
      TabPane(
        v-for="(field, index) in Tabs"
        :key="field.name + field.type + field.cType "
        :label="field.label || label.name")
        component(
          v-if="!['Array'].includes(field.cType)"
          :key="field.name + field.type + field.cType "
          :is="field.type"
          :value="parseValue(field)"
          :cType="field.cType || 'Variable'"
          :style="field.style"
          v-bind="field"
          :showLabel="false"
          :showTabs="false"
          @input="updateValue(field.name, $event)"
          @click="updateEvent(field, $event)")
        Array(
          v-if="field.cType=='Array'"
          :key="field.name"
          :field.sync="field"
          :value.sync="value[field.name]"
          :defaultVal="field.default"
          @input="updateValue(field.name, $event)")
    .object-fields(
      v-for="(field, index) in Normal"
      :key="field.name + field.type + field.cType ")
      component(
        v-if="!['Array'].includes(field.cType)"
        :is="field.type"
        :value="parseValue(field)"
        :cType="field.cType || 'Variable'"
        :style="field.style"
        v-bind="field"
        @input="updateValue(field.name, $event)"
        @click="updateEvent(field, $event)")
      Array(
        v-if="field.cType=='Array'"
        :field.sync="field"
        :value.sync="value[field.name]"
        :defaultVal="field.default"
        @input="updateValue(field.name, $event)")
</template>


<script>
import _ from "lodash";

export default {
  name: "Object",
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
    schema: {
      type: [Object, Array],
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
        return i.type !== "Object" || i.vType === "Normal";
      });
    },
    Tabs() {
      return this.schema.filter(i => {
        return i.type === "Object" && i.vType === "Tabs";
      });
    }
  },
  methods: {
    parseComponent(field) {
      if (field.cType == "Array") {
        return "Array";
      }
      return field.type;
    },
    updateValue(fieldname, value) {
      this.$set(this.value, fieldname, value);
      this.$emit("input", this.value);
    },
    updateEvent(field) {
      this.$emit("event", field);
    },
    parseValue(field) {
      if (field.type !== "Object") {
        return this.value[field.name] || field.default;
      } else {
        return this.value[field.name] || { ...field.default };
      }
    }
  }
};
</script>

<style lang="stylus">
.object
  >.object-fields
    margin-left 14px
.object-fields
  min-width 200px
</style>
