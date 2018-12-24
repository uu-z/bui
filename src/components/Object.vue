<template lang="pug">
  .object
    component(
      :key="name"
      :name="name"
      :is="field.type"
      :value="value[name]"
      v-for="(field, name) in schema"
      v-bind="field"
      @input="updateForm(name, $event)"
      @click="updateEvent(name, $event)"
      )
</template>


<script>
export default {
  name: "Object",
  props: ["schema", "value"],
  data() {
    return {
      formData: this.value || {}
    };
  },
  methods: {
    updateForm(fieldname, value) {
      const { format } = this.schema[fieldname];
      if (format) {
        value = format(value);
      }
      this.$set(this.value, fieldname, value);
    },
    updateEvent(name) {
      const field = this.schema[name];
      this.$emit("event", { ...field, name });
    }
  }
};
</script>
