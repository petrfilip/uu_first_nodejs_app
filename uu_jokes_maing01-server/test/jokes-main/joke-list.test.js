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

describe("Joke uuCMD tests - list", () => {
  test("example 04 - default pageInfo", async () => {
    // Login as a predefined test user (see config/test.json)
    await TestHelper.login("ExecutiveUser");

    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny",
    });
    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2",
    });
    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 3",
      text: "Something very funny 3",
    });

    let result = await TestHelper.executeGetCommand("joke/list");

    expect(result.data.pageInfo.total).toEqual(3);
    expect(result.data.pageInfo.pageIndex).toEqual(0);
    expect(result.data.pageInfo.pageSize).toEqual(1000);
    expect(result.data.itemList[0].name).toEqual("Very Funny Joke");
  });

  test("example 04 - only approved", async () => {
    // Login as a predefined test user (see config/test.json)
    // myUser has not profile Executives so jokes created by him wont be approved.
    await TestHelper.login("ReaderUser");

    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny",
    });

    // login to authority and creating another two jokes
    await TestHelper.login("ExecutiveUser");

    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2",
    });
    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 3",
      text: "Something very funny 3",
    });

    let result = await TestHelper.executeGetCommand("joke/list");

    expect(result.data.pageInfo.total).toEqual(2);
  });

  test("example 04 - custom pageInfo", async () => {
    await TestHelper.login("ExecutiveUser");

    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke",
      text: "Something very funny",
    });
    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 2",
      text: "Something very funny 2",
    });
    await TestHelper.executePostCommand("joke/create", {
      name: "Very Funny Joke 3",
      text: "Something very funny 3",
    });

    let dtoIn = {
      pageInfo: {
        pageIndex: 1,
        pageSize: 2,
      },
    };
    let result = await TestHelper.executeGetCommand("joke/list", dtoIn);

    expect(result.data.pageInfo.total).toEqual(3);
    expect(result.data.pageInfo.pageIndex).toEqual(1);
    expect(result.data.pageInfo.pageSize).toEqual(2);
    expect(result.data.itemList.length).toEqual(1);
  });
});
