"use strict";
const {Validator} = require("uu_appg01_server").Validation;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const {Profile, AppClientTokenService, UuAppWorkspace, UuAppWorkspaceError} = require("uu_appg01_server").Workspace;
const {UriBuilder} = require("uu_appg01_server").Uri;
const {LoggerFactory} = require("uu_appg01_server").Logging;
const {AppClient} = require("uu_appg01_server");
const Errors = require("../api/errors/jokes-main-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  }
};

const EXECUTIVES_PROFILE = "Executives";
const AUTHORITIES_PROFILE = "Authorities";


class JokesMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("jokesMain");
  }

  async update(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("jokeUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.updateUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    const jokeToUpdate =  await this.get(awid, {...dtoIn});

    if (!this.hasRights(authorizationResult, jokeToUpdate, session)) {
      throw new Errors.Update.UserNotAuthorized();
    }

    let dtoOut = {}
    try {
      dtoIn.awid = awid
      dtoOut = await this.dao.update(dtoIn)
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.JokeDaoUpdateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("jokeDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.Delete.InvalidDtoIn);

    const jokeToDelete =  await this.get(awid, dtoIn);

    if (!this.hasRights(authorizationResult, jokeToDelete, session)) {
      throw new Errors.Delete.UserNotAuthorized();
    }

    try {
      this.dao.remove(jokeToDelete)
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Delete.JokeDaoDeleteFailed({uuAppErrorMap}, e);
      }
      throw e;
    }


    let dtoOut = {}
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  hasRights(authorizationResult, jokeToDelete, session) {
    return (authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE)) ||
      jokeToDelete.uuIdentity === session.getIdentity().getUuIdentity();
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("jokeGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.Get.InvalidDtoIn);

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Get.JokeDoesNotExist();
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
    // hds 1, 1.1
    let validationResult = this.validator.validate("jokeListDtoInType", dtoIn);

    // hds 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.List.InvalidDtoIn);

    // hds 2
    let dtoOut = await this.dao.listByVisibility(awid, true, dtoIn.pageInfo);

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn, session, authorizationResult) {

    let validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);


    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);

    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();


    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.JokeDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }


    dtoOut.awid = awid;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new JokesMainAbl();
