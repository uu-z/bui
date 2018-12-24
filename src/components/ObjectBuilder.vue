<template lang="pug">
  .object-builder
    .field-list
      component(
        :key="name"
        v-for="(field, name) in schema"
        is="Enum"
        v-bind="parseOption(field)"
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
  computed: {
    currentField() {
      return this.schema[this.currentFieldName];
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
    parseOption(field) {
      return {
        ...field,
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
