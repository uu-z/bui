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
        .getItem( data-shape="k-means" data-type="node" data-size="170*34") K 均值聚类
        .getItem( data-shape="random-forest" data-type="node" data-size="170*34") 随机森林
        .getItem( data-shape="PS-SMART" data-type="node" data-size="170*34") PS-SMART 分类
        .getItem( data-shape="read-data-base" data-type="node" data-size="170*34") 读数据表
        .getItem( data-shape="Bayes" data-type="node" data-size="170*34") 朴素贝叶斯
      .page(ref="page")

</template>

<script>
import G6Editor from "@antv/g6-editor";

const { Flow } = G6Editor;

Flow.registerNode("model-card", {
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
});

// k 均值聚类
Flow.registerNode(
  "k-means",
  {
    label: "k 均值聚类",
    color_type: "#1890FF",
    type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
    state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg",
    // 设置锚点
    anchor: [
      [
        0.5,
        0,
        {
          type: "input"
        }
      ], // 上面边的中点
      [
        0.5,
        1,
        {
          type: "output"
        }
      ] // 下边边的中点
    ]
  },
  "model-card"
);

// 随机森林
Flow.registerNode(
  "random-forest",
  {
    label: "随机森林",
    color_type: "#9254DE",
    type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
    state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg",
    // 设置锚点
    anchor: [
      [
        0.5,
        0,
        {
          type: "input"
        }
      ],
      [
        0.5,
        1,
        {
          type: "output"
        }
      ]
    ]
  },
  "model-card"
);

// PS-SMART 分类
Flow.registerNode(
  "PS-SMART",
  {
    label: "PS-SMART 分类",
    color_type: "#1890FF",
    type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
    state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg",
    // 设置锚点
    anchor: [
      [
        0.5,
        0,
        {
          type: "input"
        }
      ],
      [
        0.33,
        1,
        {
          type: "output"
        }
      ],
      [
        0.66,
        1,
        {
          type: "output"
        }
      ]
    ]
  },
  "model-card"
);

// 朴素贝叶斯
Flow.registerNode(
  "Bayes",
  {
    label: "朴素贝叶斯",
    color_type: "#9254DE",
    type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
    state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg",
    // 设置锚点
    anchor: [
      [
        0.5,
        0,
        {
          type: "input"
        }
      ],
      [
        0.5,
        1,
        {
          type: "output"
        }
      ]
    ]
  },
  "model-card"
);

// 读数据表
Flow.registerNode(
  "read-data-base",
  {
    label: "读数据表",
    color_type: "#FAAD14",
    type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
    state_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg",
    // 设置锚点
    anchor: [
      [
        0.5,
        1,
        {
          type: "output"
        }
      ]
    ]
  },
  "model-card"
);

export default {
  mounted() {
    const editor = new G6Editor();
    const itempannel = new G6Editor.Itempannel({
      container: this.$refs.itempannel
    });
    const page = new G6Editor.Flow({
      graph: {
        container: this.$refs.page,
        height: window.innerHeight - 200
      },
      align: {
        grid: true
      }
    });
    const toolbar = new G6Editor.Toolbar({
      container: this.$refs.toolbar,
    });
    const contextmenu = new G6Editor.Contextmenu({
      container: this.$refs.contextmenu
    });
    editor.add(page);
    editor.add(itempannel);
    editor.add(contextmenu);
    editor.add(toolbar);

  }
};
</script>

<style lang="stylus" scoped>
.editor
  user-select: none
  -webkit-user-select: none
  .contextmenu
    display: none
  .container
    position: relative;
    .itempannel 
      position: absolute
      .getItem
        &:hover
          cursor: move
    .page
      margin-left 150px
      background #eee
</style>
