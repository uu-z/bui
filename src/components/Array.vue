<template lang="pug">
  .array
    .field
      .field-label(@click="open = !open")
        span.arrow(:class="{right: true, rotated: open}")
        label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{field.label || field.name}}
      .field-action
        span.add(@click="add") {{' +'}}
    draggable.fieldList(
      v-if="open"
      v-model="_value"
      :options="dragOptions" )
      .draggable-item(
        v-for="(item, index) in value" :key="index")
        .draggable-field
          component(
          :is="field.type"
          :value.sync="item"
          :showLabel="false"
          :showRange="false"
          :style="field.style"
          v-bind="field"
          @input="updateForm(index, field.name, $event)")
        span.remove(@click="remove(index)")  -
</template>

<script>
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "Array",
  data() {
    return {
      dragOptions: {
        animation: 0,
        group: "description",
        ghostClass: "ghost"
      },
      open: false
    };
  },
  props: {
    field: {},
    value: {
      default() {
        return [];
      }
    },
    showLabel: {
      default: true
    }
  },
  computed: {
    ...mapVars(["defaultValue"]),
    _value: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  mounted() {
    if (!Array.isArray(this.value)) {
      this.$emit("input", []);
    } else {
      this.$emit("input", this.value);
    }
  },
  methods: {
    add() {
      const value = _.get(this.defaultValue, this.field.type, {});
      this.value.push(value);
    },
    remove(index) {
      this.$delete(this.value, index);
    },
    updateForm(index, fieldname, value) {
      this.$set(this.value, index, value);
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="stylus">
.array
  position relative
  .object-fields
    margin-left 0
  .fieldList
    margin-left 14px
  .field-label-text
    margin-left 14px
  .draggable-item
    display flex
  .remove
    margin-left 10px
</style>


