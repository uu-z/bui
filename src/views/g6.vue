<template lang="pug">
  div
    v-contextmenu.field-context(ref="contextmenu")
      v-contextmenu-item(@click="addNode") Test
    #mountNode(v-contextmenu:contextmenu)
    Object(
      v-if="currentNode"
      :schema.sync="currentNode.schema"
      :value.sync="currentNode.value"
       @event="Event($event, currentNode)")

</template>


<script>
import G6 from "@antv/g6";
import axios from "axios";

export default {
  data() {
    return {
      graph: null,
      dragNode: null,
      currentNode: null,
      dx: null,
      dy: null,
      g6Data: {
        nodes: [
          {
            id: "node1",
            x: 100,
            y: 200,
            type: "node",
            color: "#FA8C16",
            label: "Start",
            shape: "flow-rect",
            schema: [
              {
                name: "String",
                type: "String",
                label: "Url",
                default: "https://api.github.com/users/uu-z"
              },
              {
                name: "data",
                type: "JSON",
                label: "JSON"
              },
              {
                name: "Test",
                type: "Callback",
                label: "Test",
                async callback({ node }) {
                  let data = await axios.get(node.value.String);
                  node.value.data = data;
                }
              }
            ],
            value: {}
          },
          {
            id: "node2",
            x: 300,
            y: 200,
            schema: [],
            value: {}
          }
        ],
        edges: [
          {
            id: "edge1",
            target: "node2",
            source: "node1"
          }
        ]
      }
    };
  },
  mounted() {
    this.initG6();
  },
  methods: {
    initG6() {
      this.graph = new G6.Graph({
        container: "mountNode",
        width: 600,
        height: 300
      });
      let { graph } = this;

      graph.read(this.g6Data);
      graph.on("node:dragstart", ev => {
        const { item } = ev;
        const model = item.getModel();
        this.dragNode = item;
        this.dx = model.x - ev.x;
        this.dy = model.y - ev.y;
      });
      graph.on("node:drag", ev => {
        this.dragNode &&
          graph.update(this.dragNode, {
            x: ev.x + this.dx,
            y: ev.y + this.dy
          });
      });
      graph.on("node:dragend", ev => {
        this.dragNode = undefined;
      });
      graph.on("node:click", ev => {
        const { item } = ev;
        const model = item.getModel();
        this.currentNode = model;
      });
    },
    addNode(vm, e) {
      const { x, y } = window.event;
      this.graph.add("node", { x, y });
    },
    Event(data, node) {
      if (data.callback) {
        data.callback({ node });
      }
    }
  }
};
</script>
