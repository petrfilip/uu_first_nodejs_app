const {TestHelper} = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace( {  uuAppProfileAuthorities: "ues:DEV0183-BT:74309394485200009"});
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Joke uuCMD tests - auth", () => {
  test("example 04 - user profile", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("Authorities");

    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.visibility).toEqual(false);
    // NOTE: uuIdentity and uuIdentityName can also be tested
    // for equality, if the values are known
    expect(result.data.uuIdentity).toBeDefined();
    expect(result.data.uuIdentityName).toBeDefined();
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("example 04 - executives profile", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("ExecutiveUser");

    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
    };
    let result = await TestHelper.executePostCommand("joke/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.text).toEqual(dtoIn.text);
    expect(result.data.visibility).toEqual(true);
    // NOTE: uuIdentity and uuIdentityName can also be tested
    // for equality, if the values are known
    expect(result.data.uuIdentity).toBeDefined();
    expect(result.data.uuIdentityName).toBeDefined();
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("example 04 - unauthorized", async () => {
    expect.assertions(1);


    await TestHelper.login("ReaderUser");

    let dtoIn = {
      name: "Very Funny Joke",
      text: "Something very funny",
    };
    try {
      await TestHelper.executePostCommand("joke/create", dtoIn);
    } catch (e) {
      expect(e.code).toEqual("uu-appg01/authorization/accessDenied");
    }
  });
});
