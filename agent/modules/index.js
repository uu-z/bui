const _ = require("lodash")
const axios = require("axios")
const schema = require("../schemas")

_.each(schema, (v,k) => {
  v.schema.forEach(sv => {
    if(sv.exec){
      v[sv.name] = sv.exec
    }
  })
})


module.exports = {
  name: "Index",
  io:{
    on:{
      "get:schema"({data, socket}){
        socket.emit("schema", schema)
      },
      async "exec:Event"({data, socket}){
        let cache = {}
        for(let [k,v] of Object.entries(data)){
          const exec = _.get(schema, k)
          if(exec){
            cache[v.id] = await exec({data: v})
          }
        }
        socket.emit("result:Event", cache)
      }
    }
  }
};