<template lang="pug">
  div
    label {{label || name}}
    input(
      type="range"
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      @input="$emit('input', +$event.target.value)")
    label {{value}}
</template>

<script>
export default {
  name: "Number",
  data() {
    return {};
  },
  props: {
    label: String,
    name: String,
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    step: {
      type: Number,
      default: 0
    },
    value: {
      type: Number
    }
  }
};
</script>

