//@@viewOn:imports
import {createComponent, useDataObject} from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import JokesInstanceContext from "./jokes-instance-context";
//@@viewOff:imports

const JokesInstanceProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeInstanceProvider",
  //@@viewOff:statics

  render({children}) {
    //@@viewOn:hooks
    const workspaceData = useDataObject({
      handlerMap: {
        load: Calls.getWorkspace
      }
    });

    const myProfilesData = useDataObject({
      handlerMap: {
        load: Calls.getPermissionListByUuId
      }
    });
    //@@viewOff:hooks

    if (workspaceData.data && myProfilesData.data) {
      workspaceData.data.authorizedProfileList = myProfilesData.data.itemList.map(permission => permission.profile)
    }


    //@@viewOn:render
    return <JokesInstanceContext.Provider value={workspaceData}>{children}</JokesInstanceContext.Provider>;
    //@@viewOff:render
  }
});

export default JokesInstanceProvider;
