//@@viewOn:imports
import UU5 from "uu5g04";
import {createVisualComponentWithRef, useImperativeHandle, useLsiValues, useRef} from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "./joke-update-form.lsi";
//@@viewOff:imports

const JokeUpdateForm = createVisualComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeUpdateForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSave: () => {
    },
  },
  //@@viewOff:defaultProps

  render({onSave}, ref) {
    //@@viewOn:hooks
    const inputLsi = useLsiValues(Lsi);
    const imageRef = useRef();
    const modalRef = useRef();
    const jokeRef = useRef();

    useImperativeHandle(ref, () => ({
      open: (joke) => {
        jokeRef.current = joke;
        modalRef.current.open({
          header: renderHeader(),
          content: renderForm(joke),
          footer: renderControls(),
        });
      },
    }));
    //@@viewOn:hooks

    //@@viewOn:private
    function validateText(opt) {
      let result = {feedback: "initial", value: opt.value};
      // when there is no event, validation comes from "isValid" method
      if (opt.event === undefined) {
        // text is empty, check file
        if (!opt.value && !imageRef.current.getValue()) {
          result.feedback = "error";
          result.message = <UU5.Bricks.Lsi lsi={Lsi.textOrFile}/>;
          opt.component.setFeedback(result.feedback, result.message);
        }
      }
      return result;
    }

    function handleSave(opt) {
      modalRef.current.close(true, () => {
        onSave(jokeRef.current, opt.values);
      });
    }

    function handleCancel() {
      modalRef.current.close();
    }

    //@@viewOff:private

    //@@viewOn:render
    function renderHeader() {
      return (
        <UU5.Forms.ContextHeader
          content={<UU5.Bricks.Lsi lsi={Lsi.header}/>}
          info={<UU5.Bricks.Lsi lsi={Lsi.info}/>}
        />
      );
    }

    function renderControls() {
      return <UU5.Forms.ContextControls buttonSubmitProps={{content: <UU5.Bricks.Lsi lsi={Lsi.submit}/>}}/>;
    }

    function renderForm(joke) {
      return (
        <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
          <UU5.Forms.Text
            label={inputLsi.name}
            name="name"
            value={joke.name}
            inputAttrs={{maxLength: 255}}
            controlled={false}
            required
          />

          <UU5.Forms.File ref_={imageRef} label={inputLsi.image} name="image" controlled={false}/>

          <UU5.Forms.TextArea
            label={inputLsi.text}
            name="text"
            value={joke.text}
            inputAttrs={{maxLength: 4000}}
            onValidate={validateText}
            controlled={false}
            autoResize
          />
        </UU5.Forms.ContextForm>
      );
    }

    return <UU5.Forms.ContextModal ref_={modalRef} overflow/>;
    //@@viewOff:render
  },
});

export default JokeUpdateForm;
