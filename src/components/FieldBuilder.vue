<template lang="pug">
  div(@click="$emit('click:label')" @contextmenu.prevent="$emit('click:label')")
    label {{label || name}}
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
  props: ["enums", "name", "label", "value"]
};
</script>

