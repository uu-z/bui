<template lang="pug">
  .object-builder
    .add
      input(v-model="newField.name")
      Enum(v-model="newField.type" :enums="types")
      button(@click="addNewField") +
    .filed-builder
      .field-context
        v-contextmenu(ref="contextmenu")
          v-contextmenu-item(@click="removeField") 删除
      .field-list(v-contextmenu:contextmenu)
        FieldBuilder(
          :key="name"
          v-for="(field, name) in schema"
          v-bind="parseOption(name, field)"
          @remove="removeField(name)"
          @click:label="handleClickLabel(name)"
          @input="updateFieldType(name, $event)")
      .field-detail(v-if="currentField")
        ObjectBuilder.builder(
          @input="updateFieldType(name, $event)"
          v-if="currentField.type == 'Object'"
          :schema.sync="currentField.schema")
        component(
          v-if="currentField.type !== 'Object'"
          :is="currentField.type + 'Builder'"
          :value.sync="currentField")
</template>


<script>
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "ObjectBuilder",
  props: {
    schema: {
      type: Object
    }
  },
  data() {
    return {
      currentFieldName: "",
      newField: {
        type: "String",
        name: ""
      }
    };
  },
  beforeMount() {
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
    removeField() {
      this.$delete(this.schema, this.currentFieldName);
    },
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
    updateFieldType(name, type) {
      const target = this.schema[name];
      if (type == "Object") {
        if (!target.schema) {
          this.$set(this.schema[name], "schema", {});
        }
      }
      this.$set(this.schema[name], "type", type);
    }
  }
};
</script>

<style lang="stylus" scoped>
.filed-builder {
  display: flex;
}

.add {
  display: flex;
}
</style>
