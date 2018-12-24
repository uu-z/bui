<template lang="pug">
  div
    button(@click="$emit('click')") {{label || name}}
</template>

<script>
export default {
  name: "Enum",
  props: ["label", "name", "value"]
};
</script>

