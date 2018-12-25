<template lang="pug">
  div
    label(@click="$emit('click:label')") {{label || name}}
    input(
      type="checkbox"
      :name="name"
      :value="value"
      @input="$emit('input', !value)"
      )
</template>

<script>
export default {
  name: "Bool",
  props: ["name", "label", "value"]
};
</script>

