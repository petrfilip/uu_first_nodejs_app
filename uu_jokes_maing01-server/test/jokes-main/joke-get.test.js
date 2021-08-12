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

describe("Joke uuCMD tests - get", () => {
  test("Get - HDS", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("ExecutiveUser");

    const joke1 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny",
    });
    const joke2 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2",
    });

    let result1 = await TestHelper.executeGetCommand("joke/get", {id: joke1.id});
    let result2 = await TestHelper.executeGetCommand("joke/get", {id: joke2.id});

    expect(result1.data.id).not.toBeNull();
    expect(result1.data.text).toEqual(joke1.text);

    expect(result2.data.id).not.toBeNull();
    expect(result2.data.name).toEqual(joke2.name);
  });

  test("Get - not found ", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("ExecutiveUser");

    const joke1 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny",
    });
    const joke2 = await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2",
    });

    try {
      await TestHelper.executeGetCommand("joke/get", {id: "0b5449d6f783a2ffb00a149b9fe0553c"});
    } catch (e) {
      expect(e.code).toEqual("uu-jokes-main/joke/get/jokeDoesNotExist");
    }
  });
});
