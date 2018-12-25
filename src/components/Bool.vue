<template lang="pug">
  div
    label(@click="$emit('click:label')") {{label || name}}
    input(
      type="checkbox"
      :name="name"
      v-model="selected"
      @input="$emit('input', selected)"
      )
</template>

<script>
export default {
  name: "Bool",
  data() {
    return {
      selected: this.value
    };
  },
  props: {
    name: String,
    label: String,
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>

