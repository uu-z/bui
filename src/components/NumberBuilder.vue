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
          label: "cType",
          default: "Variable",
          enums: this.cTypes
        },
        {
          name: "step",
          type: "String",
          label: "Step",
          default: "0"
        },
        {
          name: "min",
          type: "String",
          label: "Min",
          default: "0"
        },
        {
          name: "max",
          type: "String",
          label: "Max",
          default: "100"
        },
        {
          name: "default",
          type: "Number",
          cType: this.value.cType,
          label: "Default",
          open: true,
          min: this.value.min,
          max: this.value.max,
          step: this.value.step
        }
      ];
    }
  }
};
</script>
