<template lang="pug">
  .editor
    .toolbar
      .action
        Button(@click="save") 保存
      .command(ref="toolbar")
        //- button.command(data-command="save") 保存
        Button.command(data-command="undo" ) 撤销
        Button.command(data-command="redo" ) 重做
        //- span.command(class="separator")
        Button.command(data-command="copy" ) 复制
        Button.command(data-command="paste" ) 粘贴
        Button.command(data-command="delete" ) 删除
        //- span.command(class="separator")
        Button.command(data-command="zoomIn") 放大
        Button.command(data-command="zoomOut") 缩小
        Button.command(data-command="autoZoom" ) 适应画布
        Button.command(data-command="resetZoom" ) 实际尺寸
        //- span.command(class="separator")
        Button.command(data-command="toBack" ) 层级后置
        Button.command(data-command="toFront" ) 层级前置
        //- span.command(class="separator")
        Button.command(data-command="multiSelect" ) 多选
        Button.command(data-command="addGroup" ) 成组
        Button.command(data-command="unGroup") 解组
    .contextmenu(ref="contextmenu")
      .menu(data-status="node-selected")
        .command(data-command="copy")
          Button 复制
        .command(data-command="delete")
          Button 删除
      .menu(data-status="edge-selected")
        .command(data-command="delete")
          Button 删除
      .menu(data-status="group-selected")
        .command(data-command="copy")
          Button 复制
        .command(data-command="delete")
          Button 删除
        .command(data-command="unGroup")
          Button 解组
      .menu(data-status="canvas-selected")
        Card
          .itempannel(ref="itempannel")
            Input(v-model="itemFilter" size="small")
            .getItem(v-for="(item, key) in nodes" v-if="item.label" :key="item.label" :data-shape="key" data-type="node" data-size="170*34") {{item.label}}
        //- .command(data-command="undo")
        //-   Button 撤销
        //- .command(data-command="redo")
        //-   Button 重做
        //- .command(data-command="pasteHere")
        //-   Button 粘贴
      .menu(data-status="multi-selected")
        .command(data-command="copy")
          Button 复制
        .command(data-command="pasteHere")
          Button 粘贴
        .command(data-command="addGroup")
          Button 归组
        .command(data-command="delete")
          Button 删除
    .container
      .detailpannel(ref="detailpannel")
        .pannel(data-status="node-selected")
          .block-container(v-if="selectedNode.model")
            Class(
              :schema.sync="selectedNode.model.schema",
              :value.sync="selectedNode.model"
              @event="Event($event, selectedNode)")
        .pannel(data-status="edge-selected") 边属性栏
        .pannel(data-status="group-selected") 群组属性栏
        .pannel(data-status="canvas-selected")
          .block-container
            Class(v-bind.sync="canvas")
        .panel(data-status="multi-selected") 多选时属性栏
      .page(ref="page")


</template>

<script>
import _ from "lodash";
import G6Editor from "@antv/g6-editor";
import store2 from "store2";
import * as nodes from "../nodes";
import config from "../config";
import { aSet } from "menhera";
import axios from "axios"
import io from "socket.io-client"
const { Flow } = G6Editor;



export default {
  data() {
    return {
      nodes,
      editor: null,
      page: null,
      curZoom: 1,
      minZoom: 0.5,
      maxZoom: 2,
      socket:{},
      agent: "http://localhost:8001/",
      selectedNode: {},
      itemFilter: "",
      canvas: {
        schema: [
          {
            name: "showGrid",
            label: "网格对齐",
            type: "Boolean"
          }
        ],
        value: {}
      },
      values: {}
    };
  },
  watch: {
    "nodes"(nodes){
      this.initNodes()
    },
    "canvas.value.showGrid"(val) {
      const editor = this.editor;
      const page = editor.getCurrentPage();
      if (val) {
        page.showGrid();
      } else {
        page.hideGrid();
      }
    }
  },
  mounted() {
    const editor = new G6Editor();
    this.editor = editor;
    const itempannel = new G6Editor.Itempannel({
      container: this.$refs.itempannel
    });
    const page = new G6Editor.Flow({
      graph: {
        container: this.$refs.page,
        height: window.innerHeight - 100
      },
      align: {
        grid: true
      },
      noEndEdge: false,
      edgeResizeable: false
    });
    const toolbar = new G6Editor.Toolbar({ container: this.$refs.toolbar });
    const detailpannel = new G6Editor.Detailpannel({ container: this.$refs.detailpannel });
    const contextmenu = new G6Editor.Contextmenu({ container: this.$refs.contextmenu });

    editor.add(toolbar);
    editor.add(itempannel);
    editor.add(contextmenu);
    editor.add(detailpannel);
    editor.add(page);
    this.initPage();
    this.initNodes()
    this.testAgent()
  },
  computed: {
    // page() {
    //   const editor = this.editor;
    //   return editor.getCurrentPage();
    // }
  },
  methods: {
    async initNodes(){
      const {nodes}= this
      _.each(nodes, (v, k) => {
      Flow.registerNode(k, v, v.extends);
      _.each(v.schema, (sv, sk) => {
        if (sv.exec) {
          v[`${sv.name}`] = sv.exec;
        }
      });
    });
    },
    async testAgent(){
      const socket = io(this.agent)
      this.socket = socket
      const {page} = this
      socket.on("schema", data => {
        this.nodes = {...this.nodes, ...data}
      })
      socket.on("result:Event", data => {
        _.each(data, (v,k) => {
          const node = page.find(k)
          node.model = {...node.model, ...v}
        })
      })
      socket.emit("get:schema")
    },
    async save() {
      const { page } = this;
      const data = page.save();
      await store2.add("saveData", data);
    },
    async Event(event, node) {
      console.log(event, node)
      const { callback: data } = event;
      const { page, editor } = this;

      const inputs = node.getInEdges().map(i => i.source) || [];
      if (inputs.length > 0) {
        const promises = inputs.map(i => {
          return this.runCallback({ data: { name: "run" }, node: i, page, editor });
        });
        await Promise.all(promises);
      }
      this.runCallback({ data, node, page, editor });
    },
    async runCallback(payload) {
      const { node, data } = payload;
      const {
        shapeObj: { label: nodeLabel }
      } = node;

      if(data.type == "Callback") {
        const { name: callbackName } = data;
        const callback = _.get(this.nodes, `${nodeLabel}.${callbackName}`);
        if (callback) {
          node.model.state_icon_url = config.stateIcon.running;
          node.update();
          await callback(payload);
          node.model.state_icon_url = config.stateIcon.done;
          node.update();
        }
      } else if(data.type=='Event'){
        const {label, name} = data
        this.socket.emit("exec:Event", {
          [`${label}.${name}`]: node.model
        })
      }
    },
    initPage() {
      const { editor } = this;

      const page = editor.getCurrentPage();
      this.page = page
      global.page = page
      // 输入锚点不可以连出边
      page.on("hoveranchor:beforeaddedge", ev => {
        if (ev.anchor.type === "input") {
          ev.cancel = true;
        }
      });
      page.on("dragedge:beforeshowanchor", ev => {
        // 只允许目标锚点是输入，源锚点是输出，才能连接
        if (!(ev.targetAnchor.type === "input" && ev.sourceAnchor.type === "output")) {
          ev.cancel = true;
        }
        // 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
        if (ev.dragEndPointType === "target" && page.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
          ev.cancel = true;
        }
        // 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
        if (ev.dragEndPointType === "source" && page.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
          ev.cancel = true;
        }
      });
      page.on("afteritemselected", ev => {
        this.selectedNode = ev.item;
        global.ev = ev.item;
        const {
          model: { shape }
        } = this.selectedNode;
        const shapeCount = _.countBy(this.selectedNode.itemMap._nodes, node => {
          return node.model.shape == shape;
        });

        if (!this.selectedNode.model.schema) {
          const { schema, type_icon_url } = ev.item.shapeObj;
          const { model } = this.selectedNode;
          model.schema = schema;
          model.label = `${model.shape}${shapeCount.true}`;
        }
      });
      page.on("afterzoom", ev => {
        this.curZoom = ev.updateMatrix[0];
      });

      const graph = page.getGraph();
      graph.on("click", ev => {
        if (ev.item == null) {
          this.selectedNode = {};
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.editor
  position relative
  width 100%
  canvas
    disply block
  .toolbar
    display flex
    border-bottom 1px solid #E6E9ED
  .contextmenu
    display none
  .itempannel
    display flex
    flex-direction column
    user-select none
    -webkit-user-select none
    .getItem
      &:hover
        cursor move
  .page
    margin-right 25vw
  .detailpannel
    height 100%
    position absolute
    right 0px
    z-index 2
    background #F7F9FB
    width 25vw
    border-left 1px solid #E6E9ED
    overflow auto
    .panel
      display none
  .node-header
    display flex
    align-items center
</style>
