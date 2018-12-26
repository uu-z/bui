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
  data() {
    return {
      showFields: false,
      formData: this.value || {}
    };
  },
  methods: {
    getDefaults(schema) {
      let cache = {};
      _.each(schema, (v, k) => {
        if (v.type == "Object") {
          cache[k] = _.get(this.value, k) || this.getDefaults(v.schema);
        } else {
          cache[k] = _.get(this.value, k) || v.default;
        }
      });
      return cache;
    },
    updateForm(index, fieldname, value) {
      const { format } = this.schema[index];
      if (typeof this.value !== "object") {
        this.$emit("input", { [fieldname]: value });
      } else {
        this.$set(this.value, fieldname, value);
        this.$emit("input", this.value);
      }
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
