<template lang="pug">
  div
    label(@click="$emit('click:label')") {{label || name}}
    input(
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
      selected: this.value
    };
  },
  props: {
    name: String,
    label: String,
    value: {
      type: Boolean
    }
  }
};
</script>

