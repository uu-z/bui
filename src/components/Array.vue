<template lang="pug">
  .array
    .field
      .field-label(@click="handleOpen")
        span.arrow(:class="{right: true, rotated: field.open}")
        label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{field.label || field.name}}
      .field-action
        Button.add(size="small" @click="add") +
    draggable.fieldList(
      v-if="field.open"
      v-model="_value"
      :options="dragOptions" )
      .draggable-item(v-for="(item, index) in value" :key="index")
        Icon.listIcon(size="12" type="md-list")
        .draggable-field
          component(
          :is="field.type"
          :value.sync="item"
          :showLabel="false"
          :showSlider="false"
          :style="field.style"
          v-bind="field"
          @input="updateForm(index, $event)")
        Button.remove(size="small" @click="remove(index)")  -
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
      }
    };
  },
  props: {
    field: {},
    defaultVal: {
      default() {
        return [];
      }
    },
    value: {},
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
      this.$emit("input", [...this.defaultVal]);
    }
  },
  methods: {
    handleOpen() {
      this.$set(this.field, "open", !this.field.open);
      this.$forceUpdate();
    },
    add() {
      const value = _.get(this.defaultValue, this.field.type, {});
      this.value.push(value);
    },
    remove(index) {
      this.$delete(this.value, index);
    },
    updateForm(index, value) {
      this.$set(this.value, index, value);
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="stylus">
.array
  position relative
  .object[ctype='Array']
    >.object-fields
      margin-left 0
  .fieldList
    margin-left 14px
  .listIcon
    line-height 2
    margin-right 2px
    &:hover
      cursor move
  .field-label
    >.field-label-text
      margin-left 14px
  .draggable-item
    display flex
    margin 2px 0
  .remove
    margin-left 10px
</style>


