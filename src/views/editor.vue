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
        .command(data-command="undo")
          Button 撤销
        .command(data-command="redo")
          Button 重做
        .command(data-command="pasteHere")
          Button 粘贴
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
      .itempannel(ref="itempannel")
        .getItem(v-for="(item, key) in nodes" :data-shape="key" data-type="node" data-size="170*34") {{item.label}}
      .detailpannel(ref="detailpannel")
        .pannel(data-status="node-selected")
          .pannel-title 节点属性栏
          .block-container
            Object(
              v-if="selectedNode.model"
              :schema.sync="selectedNode.model.schema",
              :value.sync="selectedNode.model"
              @event="Event($event, selectedNode)")
        .pannel(data-status="edge-selected") 边属性栏
        .pannel(data-status="group-selected") 群组属性栏
        .pannel(data-status="canvas-selected")
          .pannel-title 画布属性栏
          .block-container
            Object(:schema.sync="canvas.schema", :value.sync="canvas.value")
        .panel(data-status="multi-selected") 多选时属性栏
      .page(ref="page")


</template>

<script>
import _ from "lodash";
import G6Editor from "@antv/g6-editor";
import store2 from "store2";
import * as nodes from "../nodes";
import config from "../config";
const { Flow } = G6Editor;

export default {
  data() {
    return {
      nodes,
      curZoom: 1,
      minZoom: 0.5,
      maxZoom: 2,
      selectedNode: {},
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
    const { nodes } = this;
    _.each(nodes, (v, k) => {
      Flow.registerNode(k, v, v.extends);
      _.each(v.schema, (sv, sk) => {
        if (sv.callback) {
          v[`${sv.name}`] = sv.callback;
        }
      });
    });
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
  },
  computed: {
    page() {
      const editor = this.editor;
      return editor.getCurrentPage();
    }
  },
  methods: {
    async save() {
      const { page } = this;
      const data = page.save();
      await store2.add("saveData", data);
    },
    async Event(data, node) {
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
      const { name: callbackName } = data;
      const callback = _.get(this.nodes, `${nodeLabel}.${callbackName}`);
      if (callback) {
        node.model.state_icon_url = config.stateIcon.running;
        node.update();
        await callback(payload);
        node.model.state_icon_url = config.stateIcon.done;
        node.update();
      }
    },
    initPage() {
      const { editor } = this;
      const page = editor.getCurrentPage();

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
        if (!this.selectedNode.model.schema) {
          const { schema, type_icon_url } = ev.item.shapeObj;
          const { model } = this.selectedNode;
          model.schema = schema;
        }
      });
      page.on("afterzoom", ev => {
        this.curZoom = ev.updateMatrix[0];
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.editor
  position relative
  width 100%
  user-select none
  -webkit-user-select none
  canvas
    disply block
  .toolbar
    display flex
  .contextmenu
    display none
  .container
    position relative
    .itempannel
      min-width 100px
      height 100%
      position absolute
      background #F7F9FB
      border-right 1px solid #E6E9ED
      .getItem
        &:hover
          cursor move
    .page
      margin-left 150px
      margin-right 300px
  .detailpannel
    height 100%
    position absolute
    right 0px
    z-index 2
    background #F7F9FB
    width 300px
    border-left 1px solid #E6E9ED
    .panel
      display none
</style>
