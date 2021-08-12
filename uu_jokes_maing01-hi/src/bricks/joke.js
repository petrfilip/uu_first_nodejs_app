//@@viewOn:imports
import UU5 from "uu5g04";
import Calls from "calls";
import {createVisualComponent, useContext, useSession} from "uu5g04-hooks";
import Config from "./config/config";
import Css from "./joke.css.js";
import JokesInstanceContext from "./jokes-instance-context";
//@@viewOff:imports

const Joke = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Joke",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string,
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
    colorSchema: "blue",
    onDetail: () => {
    },
    onUpdate: () => {
    },
    onDelete: () => {
    }
  },
  //@@viewOff:defaultProps

  render({joke, colorSchema, onDetail, onUpdate, onDelete}) {
    //@@viewOn:private
    function handleDetail() {
      onDetail(joke);
    }

    function handleUpdate() {
      onUpdate(joke);
    }

    function handleDelete() {
      onDelete(joke);
    }

    function canManage() {
      const isAuthority = authorizedProfileList?.some(profile => profile === Config.Profiles.AUTHORITIES);
      const isExecutive = authorizedProfileList?.some(profile => profile === Config.Profiles.EXECUTIVES);
      const isOwner = identity.uuIdentity === joke.uuIdentity;
      return isAuthority || (isExecutive && isOwner);
    }

    //@@viewOff:private

    //@@viewOn:render
    if (!joke) {
      return null;
    }

    const {
      data: {authorizedProfileList}
    } = useContext(JokesInstanceContext);

    const {identity} = useSession();

    return (
      <UU5.Bricks.Card className={Css.main()} colorSchema={colorSchema}>
        <div className={Css.header()} onClick={handleDetail}>
          {joke.name}
        </div>
        <div className={Css.content()} onClick={handleDetail}>
          <div className={Css.text()}>
            {joke.text}
            {joke.image && (
              <UU5.Bricks.Image
                className={Css.image()}
                src={Calls.getCommandUri(`joke/getImage?image=${joke.image}`)}
                authenticate
              />
            )}
          </div>
        </div>
        <div className={Css.footer()}>
          <UU5.Bricks.Rating value={joke.averageRating}/>
          {canManage() && (
            <UU5.Bricks.Div>
              <UU5.Bricks.Button onClick={handleUpdate} bgStyle="transparent">
                <UU5.Bricks.Icon icon="mdi-pencil"/>
              </UU5.Bricks.Button>
              <UU5.Bricks.Button onClick={handleDelete} bgStyle="transparent">
                <UU5.Bricks.Icon icon="mdi-delete"/>
              </UU5.Bricks.Button>
            </UU5.Bricks.Div>
          )}
        </div>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  }
});

export default Joke;
