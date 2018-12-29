<template lang="pug">
  div
    button(@click="$emit('click')")  {{label || name}}
</template>

<script>
export default {
  props: ["label", "name", "value"]
};
</script>

