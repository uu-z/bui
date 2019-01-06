<template lang="pug">
  .string
    label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{label || name}}
    Input(
      :type="vType"
      size="small"
      :name="name"
      :value="parseIn(value)"
      clearable
      :disabled="disabled"
      :placeholder="placeholder"
      @on-change="parseOut")
</template>

<script>
export default {
  name: "String",
  props: {
    placeholder: {},
    disabled: {},
    showLabel: {
      default: true
    },
    type: {},
    parseType: {},
    vType: {
      default: "text"
    },
    label: {},
    name: {},
    value: {}
  },
  methods: {
    parseIn(value) {
      const { parseType } = this;
      if (parseType == "Enum") {
        return value.join(",");
      } else if (parseType == "Number") {
        return `${value}`;
      } else {
        return value;
      }
    },
    parseOut($event) {
      let value = $event.target.value;
      const { parseType } = this;
      if (parseType == "Enum") {
        value = value.split(",");
      } else if (parseType == "Number") {
        value = +value;
      }
      this.$emit("update:value", value);
    }
  }
};
</script>



<style lang="stylus">
.string
  display flex
  align-items center
</style>
