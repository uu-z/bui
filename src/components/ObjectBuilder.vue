<template lang="pug">
  .route
    Object(:schema="schema" :value.sync="value")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "ObjectBuilder",
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
        }
      ];
    }
  }
};
</script>
