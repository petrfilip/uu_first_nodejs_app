"use strict";
const JokesMainAbl = require("../../abl/jokes-main-abl.js");

class JokesMainController {

  update(ucEnv) {
    return JokesMainAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  delete(ucEnv) {
    return JokesMainAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    return JokesMainAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return JokesMainAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return JokesMainAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  async getImageData(ucEnv) {
    const dtoOut =  await JokesMainAbl.getImageData(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
    return ucEnv.setBinaryDtoOut(dtoOut, ucEnv.getDtoIn().contentDisposition);
  }

}

module.exports = new JokesMainController();
