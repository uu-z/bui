<template lang="pug">
  .object
    label.object-label(@click="$emit('click:label')") {{label || name}}
    .object-fields
      component(
        :key="field.name"
        :is="field.type"
        :value.sync="value[field.name] || field.default"
        :style="field.style"
        v-for="(field, index) in schema"
        v-bind="field"
        @input="updateForm(index, field.name, $event)"
        @click="updateEvent(index, $event)"
        )
</template>


<script>
import _ from "lodash";

export default {
  name: "Object",
  props: {
    name: String,
    label: String,
    schema: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    value: {
      default() {
        return {};
      }
    }
  },
  methods: {
    updateForm(index, fieldname, value) {
      this.$set(this.value, fieldname, value);
    },
    updateEvent(index) {
      const field = this.schema[index];
      this.$emit("event", field);
    }
  }
};
</script>

<style lang="stylus" scoped>
.object-fields
  margin-left 20px
</style>
