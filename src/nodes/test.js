export const Build = {
  label: "Build",
  extends: "Base",
  color_type: "#1890FF",
  type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
  state_icon_url: config.stateIcon.running,
  anchor: [
    [0.5, 0, { type: "input" }], // 上面边的中点
    [0.5, 1, { type: "output" }] // 下边边的中点
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
      async exec({ node }) {
        const { model } = node.getInEdges()[0].source;
        node.model.schema = model.Out;
      }
    }
  ]
};

export const Fetch = {
  label: "Fetch",
  extends: "Base",
  anchor: [
    [0.5, 1, { type: "output" }] // 下边边的中点
  ],
  schema: [
    {
      name: "url",
      type: "String",
      default: "https://api.github.com/users/uu-z"
    },
    {
      name: "method",
      type: "Enum",
      default: "get",
      enums: ["get", "post", "put", "delete"]
    },
    {
      name: "result",
      type: "JSON"
    },
    {
      name: "run",
      label: "Fetch",
      type: "Callback",
      async exec({ node }) {
        const { url, method } = node.model;
        let data = await axios({ url, method });
        node.model.result = data;
      }
    }
  ]
};

export const Parse = {
  label: "Parse",
  extends: "Base",
  anchor: [
    [0.5, 0, { type: "input" }], // 上面边的中点
    [0.5, 1, { type: "output" }] // 下边边的中点
  ],
  schema: [
    {
      name: "Input",
      category: "Input",
      label: "Input",
      type: "JSON"
    },
    {
      name: "Out",
      category: "Out",
      label: "Out",
      type: "JSON"
    },
    {
      name: "run",
      label: "Parse",
      type: "Callback",
      async exec({ node }) {
        const { model } = node.getInEdges()[0].source;
        let Out = [];
        _.each(model.Out, (v, k) => {
          Out.push({
            name: k,
            type: _.upperFirst(typeof v),
            default: v
          });
        });
        node.model.Out = Out;
      }
    }
  ]
};

export const LoadLocalStorage = {
  label: "LoadLocalStorage",
  extends: "Base",
  color_type: "#1890FF",
  type_icon_url: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
  state_icon_url: config.stateIcon.running,
  anchor: [
    [0.5, 0, { type: "input" }], // 上面边的中点
    [0.5, 1, { type: "output" }] // 下边边的中点
  ],
  schema: [
    {
      name: "run",
      label: "LoadLocalStorage",
      type: "Callback",
      async exec({ node, page }) {
        const data = await store2.get("saveData");
        page.read(data);
      }
    }
  ]
};

