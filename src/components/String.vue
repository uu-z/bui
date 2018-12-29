<template lang="pug">
  .string
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    component(
      :is="vType"
      type="text"
      :name="name"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('input', format ? format($event.target.value) : $event.target.value)")
</template>

<script>
export default {
  name: "String",
  props: {
    placeholder: {},
    disabled: {},
    format: {},
    showLabel: {
      default: true
    },
    type: {},
    vType: {
      default: "input"
    },
    label: {},
    name: {},
    value: {}
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

