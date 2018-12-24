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
          enums: ["Foo", "Bar"]
        },
        String: {
          type: "String",
          placeholder: "placeholder",
          label: "Last Name"
        },
        Number: {
          type: "Number",
          placeholder: "Age",
          label: "Age",
          min: 0,
          max: 100
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
