<template lang="pug">
  .enum
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    Select(
      size="small"
      :value="value"
      @on-change="$emit('input', $event)")
      Option(
        v-for="option in enums"
        :key="option"
        :value="option") {{option}}
</template>

<script>
export default {
  name: "Enum",
  data() {
    return {
      open: false
    };
  },
  props: {
    enums: {},
    name: {},
    cType: {},
    showLabel: {
      default: true
    },
    label: {},
    value: {}
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

<style lang="stylus">
.enum
  display flex
  align-items center
</style>


