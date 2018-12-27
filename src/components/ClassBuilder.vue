<template lang="pug">
  .object-builder
    .filed-builder
      .field-context
        v-contextmenu(ref="contextmenu")
          v-contextmenu-item(@click="addNewField") Add Field
          v-contextmenu-item(@click="addNewObject") Add Object
          v-contextmenu-item(@click="removeField") Remove
      FieldList(
        v-contextmenu:contextmenu
        :schema="schema"
        @click:label="handleClickLabel"
        @update:schema="$emit('update:schema', $event)")
      .field-detail(v-if="currentField")
        component(
          :is="currentField.field.type + 'Builder'"
          :value="currentField.field")
</template>


<script>
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "ClassBuilder",
  props: {
    schema: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      currentField: null,
      newField: {
        type: "String",
        name: ""
      }
    };
  },
  computed: {
    ...mapVars(["types"])
  },
  methods: {
    removeField() {
      this.$delete(this.currentField.parent, this.currentField.index);
      this.currentField = null;
    },
    handleClickLabel(data) {
      this.currentField = data;
    },
    addNewField() {
      const { parent, field } = this.currentField;
      if (field.schema) {
        field.schema.push({
          name: `NewField${field.schema.length}`,
          type: "String"
        });
      } else {
        parent.push({
          name: `NewField${parent.length}`,
          type: "String"
        });
      }
    },
    addNewObject() {
      const { parent, field } = this.currentField;
      if (field.schema) {
        field.schema.push({
          name: `NewObject${field.schema.length}`,
          type: "Object",
          schema: []
        });
      } else {
        parent.push({
          name: `NewObject${parent.length}`,
          type: "Object",
          schema: []
        });
      }
    },
    parseOption(name, field) {
      return {
        ...field,
        value: field.type
      };
    },
    updateFields(name, obj) {
      _.each(obj, (v, k) => {
        this.updateField(name, k, v);
      });
    },
    updateField(name, key, val) {
      const target = this.schema[name];
      if (key == "type" && val == "Object") {
        if (!target.schema) {
          this.$set(this.schema[name], "schema", {});
        }
      }
      this.$set(this.schema[name], key, val);
    }
  }
};
</script>

<style lang="stylus" scoped>
.filed-builder
  display flex
  .active
    background rgb(211, 211, 211)
.add
  display flex
</style>
