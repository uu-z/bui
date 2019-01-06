<template lang="pug">
  .pre
    .label(@click="open = !open")
      span.arrow(:class="{right: true, rotated: open}" )
      label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    pre(v-if="open") {{JSON.stringify(value, null, 2)}}
</template>

<script>
export default {
  name: "Pre",
  data() {
    return {
      open: true
    };
  },
  props: {
    showLabel: {
      default: true
    },
    type: {},
    label: {},
    name: {},
    value: {}
  }
};
</script>

<style lang="stylus" scoped>
.pre
  position relative
  .field-label-text
    margin-left 14px
</style>


