<template lang="pug">
  .pre
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    pre {{JSON.stringify(value, null, 2)}}
</template>

<script>
export default {
  name: "Pre",
  props: {
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

<style lang="stylus" scoped>
.pre
  display flex
</style>


