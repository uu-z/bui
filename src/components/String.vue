<template lang="pug">
  div
    label {{label || name}}
    input(
      type="text"
      :name="name"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('input', format ? format($event.target.value) : $event.target.value)"
      )
</template>

<script>
export default {
  name: "String",
  props: ["placeholder", "disabled", "format", "type", "label", "name", "value"],
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

