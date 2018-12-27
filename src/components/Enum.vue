<template lang="pug">
  .enum
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    select(
      :value="value"
      @input="$emit('input', $event.target.value)"
    )
      option(:key=" ") {{" "}}
      option(
        v-for="option in enums"
        :key="option") {{option}}
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
</style>


