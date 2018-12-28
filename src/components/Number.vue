<template lang="pug">
  div
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    input(
      v-if="showRange"
      type="range"
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      @input="$emit('input', +$event.target.value)")
    input(
      type="number"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      @input="$emit('input', $event.target.value)")
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
    showLabel: {
      default: true
    },
    showRange: {
      default: true
    },
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

