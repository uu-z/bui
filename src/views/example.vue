<template lang="pug">
  .example
    ObjectBuilder.builder(:schema.sync="example.schema")
    Object.object(:schema.sync="example.schema" :value.sync="value" @event="Event")
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  computed: {
    ...mapVars(["types"])
  },
  methods: {
    Event(data) {
      console.log(data);
    }
  },
  data() {
    return {
      value: {},
      example: {
        schema: {
          Object: {
            type: "Object",
            schema: {
              Enum: {
                type: "Enum",
                label: "Enum",
                default: "Foo",
                enums: ["Foo", "Bar"]
              }
            }
          },
          Enum: {
            type: "Enum",
            label: "Enum",
            default: "Foo",
            enums: ["Foo", "Bar"]
          },
          String: {
            type: "String",
            placeholder: "placeholder",
            default: "Hello World!",
            label: "String"
          },
          Int: {
            type: "Number",
            label: "Int",
            default: 23,
            min: 0,
            max: 100
          },
          Float: {
            type: "Number",
            label: "Float",
            default: 23.33,
            step: 0.01,
            min: 0,
            max: 100
          },
          Bool: {
            type: "Bool",
            label: "Bool",
            default: true
          },
          Event: {
            type: "Event",
            label: "Submit"
          }
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
