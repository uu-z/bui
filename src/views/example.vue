<template lang="pug">
  .example
    ObjectBuilder.builder(:schema.sync="schema")
    Object.object(:schema="schema" :value.sync="formData" @event="Event")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  methods: {
    Event(data) {
      console.log(data);
    }
  },
  data() {
    return {
      formData: {},
      schema: {
        Enum: {
          type: "Enum",
          label: "Enum",
          value: "Foo",
          enums: ["Foo", "Bar"]
        },
        String: {
          type: "String",
          placeholder: "placeholder",
          label: "String"
        },
        Int: {
          type: "Number",
          label: "Int",
          min: 0,
          max: 100
        },
        Float: {
          type: "Number",
          label: "Float",
          step: 0.01,
          min: 0,
          max: 100
        },
        Bool: {
          type: "Bool",
          label: "Bool"
        },
        Event: {
          type: "Event",
          label: "Submit"
        }
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.example {
  display: flex;
  flex-direction: column;
  align-items: center;

  .builder {
    margin: 2vw;
  }
}
</style>
