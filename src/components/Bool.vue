<template lang="pug">
  .bool
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    input(
      ref="Bool"
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
  name: "Bool",
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

