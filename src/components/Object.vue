<template lang="pug">
  .object
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    .object-fields(v-for="(field, index) in schema")
      component(
        v-if="!['Array'].includes(field.cType)"
        :key="field.name + field.type + field.cType "
        :is="field.type"
        :value.sync="value[field.name] || field.default"
        :cType="field.cType || 'Variable'"
        :style="field.style"
        v-bind="field"
        @input="updateForm(index, field.name, $event)"
        @click="updateEvent(index, $event)")
      Array(
        :field="field"
        :value.sync="value[field.name] || field.default"
        v-if="field.cType=='Array'"
        @input="updateForm(index, field.name, $event)")

</template>


<script>
import _ from "lodash";

export default {
  name: "Object",
  props: {
    name: String,
    label: String,
    showLabel: {
      default: true
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
  methods: {
    parseComponent(field) {
      if (field.cType == "Array") {
        return "Array";
      }
      return field.type;
    },
    updateForm(index, fieldname, value) {
      this.$set(this.value, fieldname, value);
    },
    updateEvent(index) {
      const field = this.schema[index];
      this.$emit("event", field);
    }
  }
};
</script>

<style lang="stylus" scoped>
.object-fields
  margin-left 10px
</style>
