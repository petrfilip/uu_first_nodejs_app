"use strict";
const JokesInstanceAbl = require("../../abl/jokes-instance-abl");

class JokesInstanceController {

  sayHello(ucEnv) {
    return JokesInstanceAbl.sayHello(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  init(ucEnv) {
    return JokesInstanceAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new JokesInstanceController();
