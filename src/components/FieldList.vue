<template lang="pug">
  .field-list
    draggable(
      v-model="_schema"
      :options="dragOptions" )
      .draggable-item(
        v-for="(item, index) in schema"
        :key="item.name")
        div(
          @click="$emit('click:label',{index,field: item, parent: schema})"
          @contextmenu.prevent="$emit('click:label',{index, field: item, parent: schema})") {{item.name}}
        FieldList.field-sublist(
          v-if="item.schema"
          :schema.sync="item.schema"
          @click:label="$emit('click:label', $event)"
          )
</template>

<script>
export default {
  name: "FieldList",
  props: ["schema"],
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
    _schema: {
      get() {
        return this.schema;
      },
      set(val) {
        this.$emit("update:schema", val);
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
.field-sublist
  margin-left 20px
</style>

