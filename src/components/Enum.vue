<template lang="pug">
  div
    label(@click="$emit('click:label')") {{label || name}}
    select(
      :value="value"
      @input="$emit('input', $event.target.value)"
    )
      option(:key=" ") {{" "}}
      option(
        v-for="option in enums"
        :key="option") {{option}}
</template>

<script>
export default {
  name: "Enum",
  props: ["multi", "enums", "name", "label", "value"]
};
</script>

