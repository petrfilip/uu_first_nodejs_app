const {TestHelper} = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("Joke uuCMD tests - delete", () => {
  test("Delete - hds", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("ExecutiveUser");

    const joke1 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny"
    });
    const joke2 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2"
    });


    let result1 = await TestHelper.executePostCommand("joke/delete", {id: joke1.id});
    let result2 = await TestHelper.executePostCommand("joke/delete", {id: joke2.id});

    expect(result1.data.uuAppErrorMap).toEqual({});
    expect(result2.data.uuAppErrorMap).toEqual({});

  });

  test("Delete - Not found ", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("ExecutiveUser");

    const joke1 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny"
    });
    const joke2 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2"
    });

    try {
      await TestHelper.executePostCommand("joke/delete", {id: "0b5449d6f783a2ffb00a149b9fe0553c"});
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/joke/get/jokeDoesNotExist");
    }
  });




});
