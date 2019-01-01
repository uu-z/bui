<template lang="pug">
  .boolean
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    input(
      ref="Boolean"
      type="checkbox"
      :name="name"
      :checked="value"
      :true-value="true"
      :false-value="false"
      @input="$emit('input', $event.target.checked)"
      )
</template>

<script>
export default {
  name: "Boolean",
  data() {
    return {
      open: false
    };
  },
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

