import React from "react";
import Playground from "../../Apps/Playground/Playground";
import ProgressBars from "../../Apps/ProgressBars/ProgressBars";
import Reminders from "../../Apps/Reminders/Reminders";
import Search from "../../Apps/Search/Search";
import Train from "../../Apps/Train/Train";

type Props = {};

const APP_NAMES: Record<string, string> = {
  NONE: "NONE",
  TRAIN: "TRAIN",
  REMINDERS: "REMINDERS",
  SEARCH: "SEARCH",
  PROGRESS: "PROGRESS",
  PLAYGROUND: "PLAYGROUND",
};

const APPS: Record<string, string> = {
  TRAIN: "Where is the train?",
  REMINDERS: "Reminders",
  SEARCH: "Looking for something?",
  PLAYGROUND: 'Playground',
  PROGRESS: 'Progress Bars'
};

const AppsPage: React.FC<Props> = () => {
  const [currentApp, setCurrentApp] = React.useState(APP_NAMES.NONE);

  const getAppComponent = () => {
    switch (currentApp) {
      case APP_NAMES.TRAIN:
        return <Train />;
      case APP_NAMES.REMINDERS:
        return <Reminders />;
      case APP_NAMES.SEARCH:
        return <Search />;
      case APP_NAMES.PROGRESS:
        return <ProgressBars />
      default:
        return <Playground />
    }
  };

  const appOptions =
    currentApp === APP_NAMES.NONE ? (
      Object.keys(APPS).map((name, index) => {
        return (
          <button
            key={`${name}_${index}`}
            onClick={() => setCurrentApp(APP_NAMES[name])}
          >
            {APPS[name]}
          </button>
        );
      })
    ) : (
      <button onClick={() => setCurrentApp(APP_NAMES.NONE)}>
        Back to App Selection
      </button>
    );

  return (
    <div>
      {appOptions}
      {getAppComponent()}
    </div>
  );
};

export default AppsPage;
