import "./styles.css";
import React, { useEffect, useRef } from "react";
import ProgressBar from "./ProgressBar";

const MAX_CONCURRENT_PROGRESS_BARS = 3;

const Playground = () => {
  const [pbEls, setPbEls] = React.useState([]);
  const pbKeyCounter = useRef(0);
  const pendingPbs = useRef([]);
  const currentRunningPbsCounter = useRef(0);

  const onComplete = () => {
    currentRunningPbsCounter.current = --currentRunningPbsCounter.current;

    const nextPb = pendingPbs.current.shift();

    if (nextPb) {
      setPbEls((currPbEls) => {
        const updatedPb = React.cloneElement(nextPb, {
          shouldStart: true,
        });

        currPbEls[nextPb.key] = updatedPb;

        return [...currPbEls];
      });
    }
  };

  const addPb = () => {
    setPbEls((currPbEls) => {
      const shouldStart =
        currentRunningPbsCounter.current < MAX_CONCURRENT_PROGRESS_BARS &&
        pendingPbs.current.length === 0;
      const newPb = (
        <ProgressBar
          key={pbKeyCounter.current}
          shouldStart={shouldStart}
          onComplete={() => onComplete()}
        />
      );
      pbKeyCounter.current = pbKeyCounter.current + 1;

      if (shouldStart) {
        currentRunningPbsCounter.current = ++currentRunningPbsCounter.current;
      } else {
        pendingPbs.current.push(newPb);
      }

      return [...currPbEls, newPb];
    });
  };

  useEffect(() => {
    // if you return a function in useeffect
    // the function will execute after component unmounts
  }, []);

  return (
    <div className="Playground">
      <button onClick={() => addPb()}>add</button>
      {pbEls}
    </div>
  );
};

export default Playground;
