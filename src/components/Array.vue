<template lang="pug">
  .array
    .field-label(@click="open = !open")
      span.arrow( :class="{right: true, rotated: open}")
      label.field-label-text(v-if="showLabel" @click="$emit('click:label')") {{field.label || field.name}}
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
          :style="field.style"
          v-bind="field"
          @input="updateForm(index, field.name, $event)")
</template>

<script>
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
      default: []
    },
    showLabel: {
      default: true
    }
  },
  computed: {
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
    this.$emit("input", this.value);
  },
  methods: {
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
  .field-label-text
    margin-left 14px
</style>


