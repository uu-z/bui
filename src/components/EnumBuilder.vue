<template lang="pug">
  .route
    Object(:schema="schema" :value="value")
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
          label: "cType",
          default: "Variable",
          enums: this.cTypes
        },
        {
          name: "enums",
          type: "String",
          label: "Enums",
          format: v => v.split(",")
        },
        {
          name: "default",
          type: "Enum",
          label: "Default",
          enums: this.value.enums
        }
      ];
    }
  }
};
</script>
