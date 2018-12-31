<template lang="pug">
  .editor
    .toolbar(ref="toolbar")
      button.command(data-command="undo" ) 撤销
      button.command(data-command="redo" ) 重做
      //- span.command(class="separator")
      button.command(data-command="copy" ) 复制
      button.command(data-command="paste" ) 粘贴
      button.command(data-command="delete" ) 删除
      //- span.command(class="separator")
      button.command(data-command="zoomIn") 放大
      button.command(data-command="zoomOut") 缩小
      button.command(data-command="autoZoom" ) 适应画布
      button.command(data-command="resetZoom" ) 实际尺寸
      //- span.command(class="separator")
      button.command(data-command="toBack" ) 层级后置
      button.command(data-command="toFront" ) 层级前置
      //- span.command(class="separator")
      button.command(data-command="multiSelect" ) 多选
      button.command(data-command="addGroup" ) 成组
      button.command(data-command="unGroup") 解组
    .contextmenu(ref="contextmenu")
      .menu(data-status="node-selected")
        .command(data-command="copy")
          button 复制
        .command(data-command="delete")
          button 删除
      .menu(data-status="edge-selected")
        .command(data-command="delete")
          button 删除
      .menu(data-status="group-selected")
        .command(data-command="copy")
          button 复制
        .command(data-command="delete")
          button 删除
        .command(data-command="unGroup")
          button 解组
      .menu(data-status="canvas-selected")
        .command(data-command="undo")
          button 撤销
        .command(data-command="redo")
          button 重做
        .command(data-command="pasteHere")
          button 粘贴
      .menu(data-status="multi-selected")
        .command(data-command="copy")
          button 复制
        .command(data-command="pasteHere")
          button 粘贴
        .command(data-command="addGroup")
          button 归组
        .command(data-command="delete")
          button 删除
    .container
      .itempannel(ref="itempannel")
        .getItem( data-shape="Fetch" data-type="node" data-size="170*34") Test
      .detailpannel(ref="detailpannel")
        .pannel(data-status="node-selected")
          .pannel-title 节点属性栏
          .block-container
            Object(
              v-if="selectedItem.shapeObj"
              :schema.sync="selectedItem.shapeObj.schema",
              :value.sync="selectedItem.model"
              @event="Event($event, selectedItem)")
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
import G6Editor from "@antv/g6-editor";

const { Flow } = G6Editor;

const nodes = {
  "model-card": {
    draw(item) {
      const group = item.getGraphicGroup();
      const model = item.getModel();
      const width = 184;
      const height = 40;
      const x = -width / 2;
      const y = -height / 2;
      const borderRadius = 4;
      const keyShape = group.addShape("rect", {
        attrs: {
          x,
          y,
          width,
          height,
          radius: borderRadius,
          fill: "white",
          stroke: "#CED4D9"
        }
      });
      // 左侧色条
      group.addShape("path", {
        attrs: {
          path: [
            ["M", x, y + borderRadius],
            ["L", x, y + height - borderRadius],
            ["A", borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height],
            ["L", x + borderRadius, y],
            ["A", borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius]
          ],
          fill: this.color_type
        }
      });
      // 类型 logo
      group.addShape("image", {
        attrs: {
          img: this.type_icon_url,
          x: x + 16,
          y: y + 12,
          width: 20,
          height: 16
        }
      });
      // 名称文本
      const label = model.label ? model.label : this.label;
      group.addShape("text", {
        attrs: {
          text: label,
          x: x + 52,
          y: y + 13,
          textAlign: "start",
          textBaseline: "top",
          fill: "rgba(0,0,0,0.65)"
        }
      });
      // 状态 logo
      group.addShape("image", {
        attrs: {
          img: this.state_icon_url,
          x: x + 158,
          y: y + 12,
          width: 16,
          height: 16
        }
      });
      return keyShape;
    },
    // 设置锚点
    anchor: [
      [0.5, 0], // 上面边的中点
      [0.5, 1] // 下边边的中点
    ]
  },
  Fetch: {
    label: "Fetch",
    color_type: "#1890FF",
    type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
    state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg",
    anchor: [
      [0.5, 0, { type: "input" }], // 上面边的中点
      [0.5, 1, { type: "output" }] // 下边边的中点
    ],
    schema: [
      {
        name: "Url",
        label: "Url",
        type: "String",
        default: "https://api.github.com/users/uu-z"
      },
      {
        name: "Out",
        label: "Out",
        type: "JSON"
      },
      {
        name: "Test",
        type: "Callback",
        label: "Test",
        async callback({ node }) {
          let data = await axios.get(node.model.Url);
          node.model.Out = data;
        }
      }
    ],
    extends: "model-card"
  }
};

_.each(nodes, (v, k) => {
  Flow.registerNode(k, v, v.extends);
});

export default {
  data() {
    return {
      curZoom: 1,
      minZoom: 0.5,
      maxZoom: 2,
      selectedItem: {},
      canvas: {
        schema: [
          {
            name: "showGrid",
            label: "网格对齐",
            type: "Bool"
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
  methods: {
    Event(data, node) {
      if (data.callback) {
        data.callback({ node });
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
        this.selectedItem = ev.item;
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
