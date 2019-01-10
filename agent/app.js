const { koma } = require("koma");

koma.$use({
  start: {
    metas:{
      middlewares: {load: true},
      socket:{
        load: true
      }
    },
    load: {
      plugins: [],
      modules: [`${__dirname}/modules`]
    },
    config: {
      PORT: 8001,
      RUN: true
    }
  }
});
