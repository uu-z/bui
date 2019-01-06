export const Build = {
  label: "Build",
  extends: "Base",
  color_type: "#1890FF",
  type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
  state_icon_url: config.stateIcon.running,
  anchor: [
    [0, 0.5, { type: "input" }], // 上面边的中点
    [1, 0.5, { type: "output" }] // 下边边的中点
  ],
  schema: [
    {
      name: "Object",
      label: "Object",
      type: "Object",
      value: {},
      schema: [
        {
          name: "test",
          type: "String"
        }
      ]
    },
    {
      name: "Build",
      label: "Build",
      type: "Callback",
      async callback({ node }) {
        const { model } = node.getInEdges()[0].source;
        node.model.schema = model.Out;
      }
    }
  ]
};
