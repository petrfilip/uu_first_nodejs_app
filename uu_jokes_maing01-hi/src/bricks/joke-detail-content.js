//@@viewOn:imports
import UU5 from "uu5g04";
import {createVisualComponent} from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import Css from "./joke-detail-content.css";
import Lsi from "./joke-detail-content.lsi";

//@@viewOff:imports

function Line({icon, content}) {
  return (
    <div className={Css.line()}>
      <UU5.Bricks.Icon className={Css.icon()} icon={icon}/>
      {content}
    </div>
  );
}

const JokeDetailContent = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string,
      uuIdentity: UU5.PropTypes.string,
    }).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
  },
  //@@viewOff:defaultProps

  render({joke}) {
    //@@viewOn:hooks

    //@@viewOff:hooks

    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        {joke.text}
        {joke.image && (
          <UU5.Bricks.Image
            className={Css.image()}
            src={Calls.getCommandUri(`joke/getImage?image=${joke.image}`)}
            authenticate
          />
        )}
        <div className={Css.ratingBox()}>
          <UU5.Bricks.Rating className={Css.rating()} value={joke.averageRating}/>
          <UU5.Bricks.Lsi lsi={Lsi.votes} params={[joke.ratingCount]}/>
        </div>

        <Line icon="mdi-account" content={joke.uuIdentityName}/>
        <Line icon="mdi-calendar" content={<UU5.Bricks.DateTime value={joke.sys.cts} dateOnly/>}/>
      </div>
    );
    //@@viewOff:render
  },
});

export default JokeDetailContent;
