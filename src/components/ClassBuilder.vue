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
        :object.sync="object"
        @click:label="handleClickLabel")
      .field-detail(v-if="currentField")
        component(
          :is="currentField.field.type + 'Builder'"
          :value="currentField.field")
</template>


<script>
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "ClassBuilder",
  props: ["object"],
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
    schema: {
      get() {
        return this.object.schema;
      },
      set(schema) {
        this.$set(this.object, "schema", schema);
      }
    },
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
      if (field.type == "Object") {
        const { schema = [] } = field;
        this.$set(field, "schema", [
          ...schema,
          {
            name: `NewField${schema.length}`,
            type: "String"
          }
        ]);
      } else {
        parent.push({
          name: `NewField${parent.length}`,
          type: "String"
        });
      }
    },
    addNewObject() {
      const { parent, field } = this.currentField;
      if (field.type == "Object") {
        const { schema = [] } = field;
        this.$set(field, "schema", [
          ...schema,
          {
            name: `NewObject${schema.length}`,
            type: "Object",
            schema: []
          }
        ]);
      } else {
        parent.push({
          name: `NewObject${parent.length}`,
          type: "Object",
          schema: []
        });
      }
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
