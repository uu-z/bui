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
      FieldList(
        v-contextmenu:contextmenu
        :schema="schema"
        @click:label="handleClickLabel"
        @update:schema="$emit('update:schema', $event)")
      //- .field-list(v-contextmenu:contextmenu)
      //-   FieldBuilder.field-builder(
      //-     :key="name"
      //-     :class="{active: currentFieldName == name}"
      //-     v-for="(field, name) in schema"
      //-     v-bind="parseOption(name, field)"
      //-     @click:label="handleClickLabel(name)"
      //-     @inputs="updateFields(name, $event)")
      .field-detail(v-if="currentField")
        component(
          :is="currentField.type + 'Builder'"
          :value="currentField")
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
      currentFieldPath: "",
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
      this.$delete(this.schema, this.currentFieldPath);
    },
    handleClickLabel(path, item) {
      this.currentFieldPath = path;
      this.currentField = item;
      // this.currentFieldName = name;
    },
    resetNewField() {
      this.newField = {
        type: "String",
        name: ""
      };
    },
    addNewField() {
      if (!this.newField.name) return;
      this.$emit("update:schema", [...this.schema, this.newField]);
      this.resetNewField();
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
