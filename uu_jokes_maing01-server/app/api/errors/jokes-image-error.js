"use strict";
const JokesMainUseCaseError = require("./jokes-main-use-case-error.js");

const GetImageData = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}getImageData/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetImageData.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  JokeImageDoesNotExist: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetImageData.UC_CODE}jokeImageDoesNotExist`;
      this.message = "Object jokeImage does not exist.";
    }
  },
};
module.exports = {
  GetImageData,
};
