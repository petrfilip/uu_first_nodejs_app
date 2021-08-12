//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import WelcomeRow from "../bricks/welcome-row.js";
import Joke from "../bricks/joke";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;

    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}

    .uu5-bricks-header {
      margin-top: 8px;
    }

    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

const Home = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    const data = [
      {
        label: "Jan",
        value: 4000,
        value2: 3000,
        value3: 1000
      },
      {
        label: "Feb",
        value: 3000,
        value2: 1000,
        value3: 2000
      },
      {
        label: "Mar",
        value: 2000,
        value2: 1400,
        value3: 3000
      },
      {
        label: "Apr",
        value: 2780,
        value2: 2000,
        value3: 4000
      },
      {
        label: "May",
        value: 1890,
        value2: 2900,
        value3: 1400
      },
      {
        label: "Jun",
        value: 2390,
        value2: 5000,
        value3: 1600
      },
      {
        label: "Jul",
        value: 3490,
        value2: 1000,
        value3: 1900
      },
      {
        label: "Aug",
        value: 500,
        value2: 3200,
        value3: 1500
      },
      {
        label: "Sep",
        value: 1500,
        value2: 1100,
        value3: 2300
      },
      {
        label: "Oct",
        value: 3400,
        value2: 4300,
        value3: 2100
      },
      {
        label: "Nov",
        value: 2895,
        value2: 3100,
        value3: 2900
      },
      {
        label: "Dec",
        value: 4400,
        value2: 2200,
        value3: 3000
      }
    ];

    const series = [
      {
        valueKey: "value",
        name: "First chart",
        colorSchema: "red"
      },
      {
        valueKey: "value2",
        name: "Second chart",
        colorSchema: "blue"
      },
      {
        valueKey: "value3",
        name: "Third chart"
      }
    ];

    UU5.Environment.uu5DataMap = {data, series};

    return (
      <UU5.Bricks.Section
        header='<uu5string/><UuContentKit.Bricks.BlockInfo icon="mdi-format-paint" content="Dynamic Rendering" />'
        content={`<uu5string/>
      <UU5.SimpleChart.AreaChart
        data='<uu5data/>data'
        series='<uu5data/>series'
      />
      <UU5.SimpleChart.BarChart
        data='<uu5data/>data'
        series='<uu5data/>series'
      />
      `}
      />
    );
    //@@viewOff:render
  }
});
export default Home;
