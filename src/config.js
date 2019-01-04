import store2 from "store2";


export default {
  apiRoot: store2.get("apiRoot") || "http://localhost:8001",
  stateIcon:{
    running: "https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg",
    done: "https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg"
  }
};
