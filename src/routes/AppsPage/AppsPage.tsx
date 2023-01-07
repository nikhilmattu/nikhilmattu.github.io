import React from "react";
import ToDo from "../../Apps/ToDo/ToDo";
import Train from "../../Apps/Train/Train";

type Props = {};

const APP_NAMES: Record<string, string> = {
  NONE: "NONE",
  TRAIN: "TRAIN",
  TODO: "TODO",
};

const APPS: Record<string, string> = {
  TRAIN: "Where is the train?",
  TODO: "ToDo List",
};

const AppsPage: React.FC<Props> = () => {
  const [currentApp, setCurrentApp] = React.useState(APP_NAMES.NONE);

  const getAppComponent = () => {
    switch (currentApp) {
      case APP_NAMES.TRAIN:
        return <Train />;
      case APP_NAMES.TODO:
        return <ToDo />;
    }
  };

  const appOptions =
    currentApp === APP_NAMES.NONE ? (
      Object.keys(APPS).map((name) => {
        return (
          <button onClick={() => setCurrentApp(APP_NAMES[name])}>
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
