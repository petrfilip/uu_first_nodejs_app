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
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
  sayHelloUnsupportedKeys: {
    code: `${Errors.SayHello.UC_CODE}unsupportedKeys`
  },
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

const logger = LoggerFactory.get("JokesMainAbl");

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
    return (authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE)) ||
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

  async sayHello(awid, dtoIn, uuAppErrorMap = {}) {

    let validationResult = this.validator.validate("sayHelloDtoInType", dtoIn);

    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.sayHelloUnsupportedKeys.code,
      Errors.SayHello.InvalidDtoIn
    );

    return {
      output: `Hello  ${dtoIn.name}`,
      timeStamp: (new Date()).toISOString(),
      uuAppErrorMap: uuAppErrorMap
    };
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // HDS 1
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemas = ["jokesMain"];
    let schemaCreateResults = schemas.map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({uuAppErrorMap}, {schema}, e);
      }
    });
    await Promise.all(schemaCreateResults);

    if (dtoIn.uuBtLocationUri) {
      const baseUri = uri.getBaseUri();
      const uuBtUriBuilder = UriBuilder.parse(dtoIn.uuBtLocationUri);
      const location = uuBtUriBuilder.getParameters().id;
      const uuBtBaseUri = uuBtUriBuilder.toUri().getBaseUri();

      const createAwscDtoIn = {
        name: "UuJokes",
        typeCode: "uu-jokes-maing01",
        location: location,
        uuAppWorkspaceUri: baseUri,
      };

      const awscCreateUri = uuBtUriBuilder.setUseCase("uuAwsc/create").toUri();
      const appClientToken = await AppClientTokenService.createToken(uri, uuBtBaseUri);
      const callOpts = AppClientTokenService.setToken({session}, appClientToken);

      // TODO HDS
      let awscId;
      try {
        const awscDtoOut = await AppClient.post(awscCreateUri, createAwscDtoIn, callOpts);
        awscId = awscDtoOut.id;
      } catch (e) {
        if (e.code.includes("applicationIsAlreadyConnected") && e.paramMap.id) {
          logger.warn(`Awsc already exists id=${e.paramMap.id}.`, e);
          awscId = e.paramMap.id;
        } else {
          throw new Errors.Init.CreateAwscFailed({uuAppErrorMap}, {location: dtoIn.uuBtLocationUri}, e);
        }
      }

      const artifactUri = uuBtUriBuilder.setUseCase(null).clearParameters().setParameter("id", awscId).toUri();

      await UuAppWorkspace.connectArtifact(
        baseUri,
        {
          artifactUri: artifactUri.toString(),
          synchronizeArtifactBasicAttributes: false,
        },
        session
      );
    }

    // HDS 3
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await Profile.set(awid, "Authorities", dtoIn.uuAppProfileAuthorities);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.SysSetProfileFailed({uuAppErrorMap}, {role: dtoIn.uuAppProfileAuthorities}, e);
        }
        throw e;
      }
    }

    // HDS 4 - HDS N
    // TODO Implement according to application needs...

    // HDS N+1
    const workspace = UuAppWorkspace.get(awid);

    return {
      ...workspace,
      uuAppErrorMap: uuAppErrorMap,
    };
  }
}

module.exports = new JokesMainAbl();
