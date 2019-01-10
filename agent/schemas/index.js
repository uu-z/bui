const _ = require("lodash")
const axios = require("axios")

module.exports =  {
    Fetch: { 
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
          type: "Event",
          async exec({data}){
          const {url, method} = data
          const result = (await axios({url,method})).data
          return  {result}
          }
      }
      ],
  }
}
