<template lang="pug">
  .route
    Object(:schema.sync="schema" :value.sync="value")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
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
          label: "CType",
          enums: this.cTypes
        },
        {
          name: "vType",
          type: "Enum",
          label: "VType",
          enums: ["text", "password", "textarea", "url", "email", "date"]
        },
        {
          name: "default",
          type: "String",
          label: "Default",
          cType: this.value.cType,
          open: true
        }
      ];
    }
  }
};
</script>
