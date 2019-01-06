<template lang="pug">
  Object(:schema.sync="schema" :value.sync="value" @event="$emit('event', $event)")
</template>

<script>
export default {
  props: {
    schema: {},
    value: {}
  },
  mounted() {
    const { schema } = this;
    this.initSchema(schema);
  },
  methods: {
    initSchema(schema) {
      const { value } = this;
      _.each(schema, (v, k) => {
        if (!v.schema) {
          if (v[v.name]) throw Error(`schema name ${v.name} exists`);
          this.$set(value, v.name, v.default || this.getDefault(v));
        } else {
          this.initSchema(v.schema);
        }
      });
    },
    getDefault(schema) {
      if (!schema.cType || schema.cType == "Variable") {
        switch (schema.type) {
          case "String":
            return "";
            break;
          case "Number":
            return 0;
            break;
          case "Boolean":
            return false;
            break;
          case "Object":
            return {};
            break;
        }
      } else if (schema.cType == "Array") {
        return [];
      }
    }
  }
};
</script>

