<template lang="pug">
  div
    label {{label || name}}
    input(
      type="range"
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      @input="$emit('input', $event.target.value)")
    label {{value}}
</template>

<script>
export default {
  name: "Number",
  props: {
    label: String,
    name: String,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: String
    }
  }
};
</script>

