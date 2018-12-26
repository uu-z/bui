<template lang="pug">
  div
    label(@click="$emit('click:label')") {{label || name}}
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
  mounted() {
    this.$emit("input", this.value);
  },
  props: ["name", "label", "value"]
};
</script>

