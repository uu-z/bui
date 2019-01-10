<template lang="pug">
  Button(type="primary" size="small" @click="$emit('click')")  {{label || name}}
</template>

<script>
export default {
  props: ["label", "name", "value"]
};
</script>

