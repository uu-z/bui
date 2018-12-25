<template lang="pug">
  .route
    Object(:schema="schema" :value.sync="value")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  props: ["value"],
  computed: {
    ...mapVars(["types"]),
    schema() {
      return {
        name: {
          type: "String",
          disabled: true,
          label: "Name"
        },
        label: {
          type: "String",
          label: "Label"
        },
        type: {
          type: "Enum",
          label: "Type",
          enums: this.types
        },
        step: {
          type: "String",
          label: "Step",
          default: 0
        },
        min: {
          type: "String",
          label: "Min",
          default: 0
        },
        max: {
          type: "String",
          label: "Max",
          default: 100
        }
      };
    }
  }
};
</script>
