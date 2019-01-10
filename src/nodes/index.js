import store2 from "store2";
import config from "../config";

export const Base = {
  color_type: "#1890FF",
  type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
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
        img: model.type_icon_url ? model.type_icon_url : this.type_icon_url,
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
        img: model.state_icon_url ? model.state_icon_url : this.state_icon_url,
        x: x + 158,
        y: y + 12,
        width: 16,
        height: 16
      }
    });
    return keyShape;
  }, // 设置锚点
  anchor: [[0.5, 0], [0.5, 1]]
}; // 上面边的中点 // 下边边的中点

