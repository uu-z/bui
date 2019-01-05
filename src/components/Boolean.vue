<template lang="pug">
  .boolean
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    Checkbox(
      :name="name"
      :value="value"
      :true-value="true"
      :false-value="false"
      @on-change="$emit('input', $event)")
</template>

<script>
export default {
  name: "Boolean",
  mounted() {
    this.$emit("input", this.value);
  },
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

