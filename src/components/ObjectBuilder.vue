<template lang="pug">
  .route
    Object(:schema.sync="schema" :value.sync="value")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "ObjectBuilder",
  props: ["value"],
  computed: {
    ...mapVars(["types", "cTypes"]),
    schema() {
      return [
        {
          name: "name",
          type: "String",
          label: "Name"
        },
        {
          name: "label",
          type: "String",
          label: "Label"
        },
        {
          name: "type",
          type: "Enum",
          label: "Type",
          enums: this.types
        },
        {
          name: "cType",
          type: "Enum",
          label: "cType",
          enums: this.cTypes
        },
        {
          name: "default",
          type: "Object",
          label: "Default",
          cType: this.value.cType,
          schema: this.value.schema,
          open: true
        }
      ];
    }
  }
};
</script>
