<template lang="pug">
  .object-builder
    .field-list
      component(
        :key="name"
        v-for="(field, name) in schema"
        is="Enum"
        v-bind="parseOption(name, field)"
        @click:label="handleClickLabel(name)"
        @input="updateForm(name, $event)")
      .add
        input(v-model="newField.name")
        Enum(v-model="newField.type" :enums="types")
        button(@click="addNewField") +
    .field-detail
      component(
        v-if="currentField"
        :is="currentField.type + 'Builder'"
        :value.sync="currentField")
</template>


<script>
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "ObjectBuilder",
  props: ["schema"],
  data() {
    return {
      currentFieldName: "",
      newField: {
        type: "String",
        name: ""
      }
    };
  },
  mounted() {
    _.each(this.schema, (v, k) => {
      if (!v.name) {
        this.$set(this.schema[k], "name", k);
      }
    });
  },
  computed: {
    currentField() {
      const currentField = this.schema[this.currentFieldName];
      return currentField;
    },
    ...mapVars(["types"])
  },
  methods: {
    handleClickLabel(name) {
      this.currentFieldName = name;
    },
    resetNewField() {
      this.newField = {
        type: "String",
        name: ""
      };
    },
    addNewField() {
      if (!this.newField.name) return;
      this.$set(this.schema, this.newField.name, this.newField);
      this.resetNewField();
    },
    parseOption(name, field) {
      return {
        ...field,
        name,
        value: field.type,
        enums: this.types
      };
    },
    updateForm(name, value) {
      this.$set(this.schema[name], `type`, value);
    }
  }
};
</script>

<style lang="stylus" scoped>
.object-builder {
  display: flex;
}

.add {
  display: flex;
}
</style>
