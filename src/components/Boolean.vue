<template lang="pug">
  .boolean
    Checkbox(
      :name="name"
      :value="value"
      :true-value="true"
      :false-value="false"
      @on-change="$emit('update:value', $event)")
    label(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
</template>

<script>
export default {
  name: "Boolean",
  props: {
    name: {},
    label: {},
    value: {},
    cType: {},
    showLabel: {
      default: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.boolean
  padding-left 64px
</style>
