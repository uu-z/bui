<template lang="pug">
  .number
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    InputNumber(
      :value="value"
      size="small"
      :min="min"
      :max="max"
      :step="step"
      @on-change="$emit('update:value', +$event)")
    Slider.slider(
      v-if="showSlider"
      size="small"
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      @on-input="$emit('update:value', +$event)")

</template>

<script>
export default {
  name: "Number",
  props: {
    label: String,
    name: String,
    showLabel: {
      default: true
    },
    showSlider: {
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
      default: 1
    },
    value: {}
  }
};
</script>

<style lang="stylus" scoped>
.number
  display flex
  align-items center
  .slider
    margin-left 4px
</style>
