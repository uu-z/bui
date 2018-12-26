<template lang="pug">
  div(@click="$emit('click:label')" @contextmenu.prevent="$emit('click:label')")
    label {{label || name}}
    select(
      :value="value"
      @input="$emit('inputs', {type: $event.target.value})")
      option(:key=" ") {{" "}}
      option(
        v-for="option in types"
        :key="option") {{option}}
    select(
      v-if="['Map'].includes(value)"
      :value="kType"
      @input="$emit('inputs', {kType: $event.target.value})")
      option(:key=" ") {{" "}}
      option(
        v-for="option in types"
        :key="option") {{option}}
    select(
      v-if="['Map', 'Array', 'Set'].includes(value)"
      :value="vType"
      @input="$emit('inputs', {vType: $event.target.value})")
      option(:key=" ") {{" "}}
      option(
        v-for="option in types"
        :key="option") {{option}}
</template>

<script>
import _ from "lodash";
import { request, mapVars, mapObjs } from "../utils";

export default {
  name: "Enum",
  props: ["name", "label", "value", "kType", "vType"],
  computed: {
    ...mapVars(["types"])
  }
};
</script>

