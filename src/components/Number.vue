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
  mounted() {
    this.$emit("input", this.value);
  },
  props: {
    label: String,
    name: String,
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 0
    },
    value: {}
  }
};
</script>

