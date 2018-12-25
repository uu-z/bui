<template lang="pug">
  div
    label {{label || name}}
    input(
      type="text"
      :name="name"
      :value="value"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      )
</template>

<script>
export default {
  name: "String",
  props: ["placeholder", "disabled", "label", "name", "value"]
};
</script>

