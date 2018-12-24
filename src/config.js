import store2 from "store2";

export default {
  apiRoot: store2.get("apiRoot") || "http://localhost:8001"
};
