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
    const state = useDataObject({
      handlerMap: {
        load: Calls.getWorkspace
      }
    });
    //@@viewOff:hooks

    debugger
    if (state.data) {
      state.data.authorizedProfileList = ["Authorities", "Executives", "Readers"];
    }
    //@@viewOn:render
    return <JokesInstanceContext.Provider value={state}>{children}</JokesInstanceContext.Provider>;
    //@@viewOff:render
  }
});

export default JokesInstanceProvider;
