import "./styles.css";
import React, { useEffect, useRef } from "react";
const UPDATE_FREQUENCY = 1000;

const ProgressBar = ({ shouldStart, onComplete }) => {
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const totalTimeInMS = useRef((Math.random() * 2 + 3) * 1000);
  const currProgRef = useRef(currentProgress.toString());

  useEffect(() => {
    // alternate method
    // const i = setInterval(() => {
    //   setCurrentProgress((currProgress) => {
    //     const newProgress = Math.min(
    //       Math.ceil(
    //         parseInt(currProgress, 10) +
    //           (UPDATE_FREQUENCY / totalTimeInMS) * 100
    //       ),
    //       100
    //     );

    //     if (newProgress >= 100) {
    //       clearInterval(i);
    //       return '100'
    //     }
    //     return newProgress.toString()
    //   });
    // }, UPDATE_FREQUENCY);
    if (shouldStart) {
      const i = setInterval(() => {
        const newProgress = Math.min(
          Math.ceil(
            currProgRef.current +
              (UPDATE_FREQUENCY / totalTimeInMS.current) * 100
          ),
          100
        );

        if (newProgress >= 100) {
          clearInterval(i);
          onComplete();
        }
        currProgRef.current = newProgress;
        setCurrentProgress(newProgress);
      }, UPDATE_FREQUENCY);
    }
  }, [shouldStart]);

  return (
    <div className="pbBackground">
      <div
        className="pbForeground"
        style={{ width: `${currentProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

// const startPb = (pbEl) => {
//     const fgEl = pbEl.firstChild;
//     currRunningPbs++;
//     let i = setInterval(() => {
//       const currentProgress = parseInt(fgEl.dataset.currentProgress, 10);
//       const newProgress = Math.min(
//         Math.ceil(
//           currentProgress +
//             (UPDATE_INTERVAL_MS / parseInt(fgEl.dataset.totalTime, 10)) * 100
//         ),
//         100
//       );
//       if (newProgress >= 100) {
//         clearInterval(i);
//         currRunningPbs--;
//         // when this finishes, we want to trigger the next pendingpb to start
//         const nextPb = pendingPbs.shift();
//         if (nextPb) {
//           startPb(nextPb);
//         }
//       }

//       fgEl.dataset.currentProgress = newProgress;
//       fgEl.style.width = `${fgEl.dataset.currentProgress}%`;
//     }, UPDATE_INTERVAL_MS);
//   };
// import "./styles.css";

// display a button
// whenever user clicks a button we want to
// add a progress bar to the page
// progress bar should load in a given amount of time
// from 3-5s

// button with onclick event listener
// define some progress bar functino that creates a bar for us
// within that bar funcitno/component we want to use some setinterval
// update the styling to reflect a progress bar

// const root = document.getElementById("app"); // progress bar container
// const UPDATE_INTERVAL_MS = 100;
// const MAX_CONCURRENT_PBS = 1;
// let currRunningPbs = 0;
// const pendingPbs = [];

// const startPb = (pbEl) => {
//   const fgEl = pbEl.firstChild;
//   currRunningPbs++;
//   let i = setInterval(() => {
//     const currentProgress = parseInt(fgEl.dataset.currentProgress, 10);
//     const newProgress = Math.min(
//       Math.ceil(
//         currentProgress +
//           (UPDATE_INTERVAL_MS / parseInt(fgEl.dataset.totalTime, 10)) * 100
//       ),
//       100
//     );

//     if (newProgress >= 100) {
//       clearInterval(i);
//       currRunningPbs--;
//       // when this finishes, we want to trigger the next pendingpb to start
//       const nextPb = pendingPbs.shift();
//       if (nextPb) {
//         startPb(nextPb);
//       }
//     }

//     fgEl.dataset.currentProgress = newProgress;
//     fgEl.style.width = `${fgEl.dataset.currentProgress}%`;
//   }, UPDATE_INTERVAL_MS);
// };

// const createProgressBar = () => {
//   const pbBackground = document.createElement("div");
//   pbBackground.classList.add("pbBackground");

//   const pbForeground = document.createElement("div");
//   pbForeground.classList.add("pbForeground");
//   pbBackground.appendChild(pbForeground);

//   pbForeground.dataset.currentProgress = 0;

//   const totalTimeInMS = (Math.random() * 2 + 3) * 1000; // 0-5
//   pbForeground.dataset.totalTime = totalTimeInMS;

//   if (currRunningPbs < MAX_CONCURRENT_PBS) {
//     startPb(pbBackground);
//   } else {
//     pendingPbs.push(pbBackground);
//   }

//   return pbBackground;
// };

// const buttonEl = document.getElementById("addButton");

// buttonEl.addEventListener("click", () => {
//   const newPb = createProgressBar();
//   root.appendChild(newPb);
// });
