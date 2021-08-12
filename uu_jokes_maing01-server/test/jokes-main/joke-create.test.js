const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  // fire up application and database
  // Authentication, Authorization and verification of System States are disabled, because they are not objective of testing
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

// describe("Joke uuCMD tests", () => {
//   test("example 01 test - joke/create", async () => {
//     const jokeText = "testJoke01";
//     let result = await TestHelper.executePostCommand("joke/create", {joke: jokeText});
//
//     expect(result.data.joke).toEqual(jokeText);
//     expect(result.data.uuAppErrorMap).toEqual({});
//   });
// });

describe("Joke uuCMD tests", () => {
  test("example 02 - hds", async () => {
    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.awid).toEqual(TestHelper.awid);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("example 02 - invalid dtoIn", async () => {
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("joke/create", {});
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/joke/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });
});

describe("Joke uuCMD tests", () => {
  test("example 3 test - joke/create", async () => {
    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.uuAppErrorMap).toEqual({});
  });
});
