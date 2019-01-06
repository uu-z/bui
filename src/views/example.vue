<template lang="pug">
  .example
    pre.schema schema: {{example.schema}}
    ClassBuilder.builder(v-bind.sync="example")
    .data
      Class(
        :key="key"
        v-bind.sync="example"
        @event="Event($event, example)")
      pre value: {{example.value}}
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  computed: {
    ...mapVars(["types"])
  },
  methods: {
    Event(event, node) {
      const { callback } = event;

      if (callback) {
        callback.callback({ node });
      }
    }
  },
  data() {
    return {
      key: Math.random(),
      example: {
        name: "Example",
        value: {},
        schema: [
          {
            name: "Object1",
            label: "Object1",
            type: "Object",
            cType: "Variable",
            vType: "Tabs",
            default: { Enum1: "Foo" },
            schema: [
              {
                name: "Enum1",
                type: "Enum",
                label: "Enum",
                default: "Foo",
                enums: ["Foo", "Bar"]
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
                name: "Boolean",
                type: "Boolean",
                label: "Boolean",
                default: false
              }
            ]
          },
          {
            name: "Object2",
            label: "Object2",
            type: "Object",
            vType: "Tabs",
            cType: "Variable",
            schema: [
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
                default: [0, 1, 2, 3]
              }
            ]
          },
          // {
          //   name: "Avatar",
          //   type: "Avatar",
          //   label: "Avatar",
          //   src: "https://avatars1.githubusercontent.com/u/12439992?v=4"
          // },
          {
            name: "Reload",
            type: "Callback",
            label: "Reload",
            callback: ({ node }) => {
              this.key = Math.random();
              node.value = {};
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
  .schema
    position absolute
    right 5vw
  .builder
    display flex
    margin 2vw
  .data
    display flex
</style>
