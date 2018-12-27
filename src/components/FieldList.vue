<template lang="pug">
  draggable(
    v-model="schema"
    :options="dragOptions" )
    .draggable-item(
      v-for="(item, index) in schema"
      :key="item.name")
      div.field-label(
        @click="$emit('click:label',{index,field: item, parent: schema})"
        @contextmenu.prevent="$emit('click:label',{index, field: item, parent: schema})")
        span.arrow(v-if="item.schema" :class="{right: true, rotated: open}" @click="open = !open")
        span {{item.name}}
      FieldList.field-sublist(
        v-if="open && item.schema"
        :object.sync="item"
        @click:label="$emit('click:label', $event)")
</template>

<script>
export default {
  name: "FieldList",
  props: ["object"],
  data() {
    return {
      open: false
    };
  },
  methods: {
    clickLabel() {}
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        ghostClass: "ghost"
      };
    },
    schema: {
      get() {
        return this.object.schema;
      },
      set(schema) {
        this.$emit("update:object", {
          ...object,
          schema
        });
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.draggable-item
  position relative
  .field-label
    display inline-block
    margin-left 14px
  .arrow
    position absolute
    top 7px
    left 0px
    transition transform 0.1s ease
.field-sublist
  margin-left 10px
</style>

