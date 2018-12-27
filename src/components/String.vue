<template lang="pug">
  .string
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    input(
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
    label: {},
    name: {},
    value: {}
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

