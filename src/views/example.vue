<template lang="pug">
  .example
    ClassBuilder.builder(:object.sync="example")
    .data
      Object(:key="key" :schema.sync="example.schema" :value.sync="value" @event="Event")
      pre {{value}}
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
      if (data.callback) {
        data.callback();
      }
    }
  },
  data() {
    return {
      key: Math.random(),
      value: {},
      example: {
        name: "Example",
        schema: [
          {
            name: "Object",
            type: "Object",
            cType: "Array",
            label: "Object",
            default: [
              {
                Enum1: "Foo"
              }
            ],
            schema: [
              {
                name: "Enum1",
                type: "Enum",
                label: "Enum",
                default: "Foo",
                enums: ["Foo", "Bar"]
              }
            ]
          },
          {
            name: "Enum2",
            type: "Enum",
            cType: "Array",
            label: "Enum",
            default: ["Foo"],
            enums: ["Foo", "Bar"]
          },
          {
            name: "String",
            type: "String",
            cType: "Array",
            placeholder: "placeholder",
            default: ["foo", "bar"],
            label: "String"
          },
          {
            name: "Int",
            type: "Number",
            cType: "Array",
            label: "Int",
            default: [23]
          },
          {
            name: "Float",
            type: "Number",
            label: "Float",
            default: 23.33,
            step: 0.01,
            min: 0,
            max: 100
          },
          {
            name: "Bool",
            type: "Bool",
            label: "Bool",
            default: true
          },
          {
            name: "Reload",
            type: "Event",
            label: "Reload",
            callback: () => {
              this.key = Math.random();
              this.value = {};
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.example
  display flex
  flex-direction column
  align-items center
  .builder
    margin 2vw
  .data
    display flex
</style>
