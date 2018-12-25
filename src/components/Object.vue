<template lang="pug">
  .object
    label.object-label(@click="$emit('click:label')") {{label || name}}
    .object-fields
      component(
        :key="name"
        :name="name"
        :is="field.type"
        :value.sync="value[name] || field.default"
        :style="field.style"
        v-for="(field, name) in schema"
        v-bind="field"
        @input="updateForm(name, $event)"
        @click="updateEvent(name, $event)"
        )
</template>


<script>
export default {
  name: "Object",
  props: {
    name: String,
    label: String,
    schema: {
      type: Object,
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
  data() {
    return {
      showFields: false,
      formData: this.value || {}
    };
  },
  methods: {
    updateForm(fieldname, value) {
      const { format } = this.schema[fieldname];
      if (format) {
        value = format(value);
      }

      if (typeof this.value !== "object") {
        this.$emit("input", { [fieldname]: value });
      } else {
        this.$set(this.value, fieldname, value);
        this.$emit("input", this.value);
      }
    },
    updateEvent(name) {
      const field = this.schema[name];
      this.$emit("event", { ...field, name });
    }
  }
};
</script>

<style lang="stylus" scoped>
.object-label {
}

.object-fields {
  margin-left: 20px;
}
</style>
