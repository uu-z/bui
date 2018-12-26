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
          name: "default",
          type: "String",
          label: "Default"
        }
      ];
    }
  }
};
</script>
