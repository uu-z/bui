<template lang="pug">
  div
    Button(type="primary" @click="$emit('click')")  {{label || name}}
</template>

<script>
export default {
  props: ["label", "name", "value"]
};
</script>

