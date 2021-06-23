"use strict";
const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");

const Init = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

const SayHello = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}sayHello/`,

   InvalidDtoIn: class extends JokesMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${SayHello.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },

};

const Create = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}joke/create/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDaoCreateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}jokeDaoCreateFailed`;
      this.message = "Create joke by joke Dao create failed.";
    }
  },
};

const List = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}joke/list/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Get = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}joke/get/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  JokeDoesNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}jokeDoesNotExist`;
      this.message = "Joke does not exists.";
    }
  }
};

const Delete = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}joke/delete/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserNotAuthorized: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userNotAuthorized`;
      this.message = "User is not authorized.";
    }
  },

  JokeDaoDeleteFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}jokeDaoDeleteFailed`;
      this.message = "Delete joke by joke Dao create failed.";
    }
  }
};

const Update = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}joke/update/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserNotAuthorized: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userNotAuthorized`;
      this.message = "User is not authorized.";
    }
  },

  JokeDaoUpdateFailed: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}jokeDaoUpdateFailed`;
      this.message = "Update joke by joke Dao create failed.";
    }
  }
};


module.exports = {
  Update,
  Delete,
  Get,
  List,
  Create,
  SayHello,
  Init,
};
