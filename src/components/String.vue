<template lang="pug">
  .string
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    component(
      :is="vType"
      size="small"
      :name="name"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @on-change="$emit('input', format ? format($event.target.value) : $event.target.value)")
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
      default: "Input"
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



<style lang="stylus">
.string
  display flex
  align-items center
</style>
