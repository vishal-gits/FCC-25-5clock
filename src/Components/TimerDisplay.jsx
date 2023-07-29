import { useEffect, useState, useRef } from "react";
import {
  calculateSeconds,
  calculateTimeLeft,
  displayTimeLeft,
  startTimer,
} from "../Functions";

const TimerDisplay = ({ parameters }) => {
  const { displayTime, setDisplayTime, trackLength, timerMode } = parameters;

  let intervalIdRef = useRef();
  let displayRef = useRef();

  //STATIC TIME DISPLAY
  const staticDisplay = (trackLength) => {
    let timeLeftSeconds = calculateTimeLeft(trackLength.sessionLength);
    return displayTimeLeft(timeLeftSeconds);
  };
  const staticTime = staticDisplay(trackLength);

  useEffect(() => {
    // if(timerMode.status=='pause'){}
    setDisplayTime({
      ...displayTime,
      mins: staticTime.mins,
      seconds: staticTime.seconds,
    });
  }, [trackLength.sessionLength]);

  // START TIMER FUNCTION

  // TIMER ON TIME DISPLAY

  useEffect(() => {
    if (timerMode.status == "on") {
      console.log("timer on");
      console.log("inside useEffect");
      startTimer(
        intervalIdRef,
        displayRef,
        displayTime,
        setDisplayTime,
        trackLength
      );
      console.log("p2");
    } else {
      console.log("timer off");
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [timerMode.status]);

  // get useRef for interval Id
  //start timer, with getting latest time start
  //calculate timeleft seconds
  // decrease timer
  // zero condition
  //clearInterval
  //put start-stop-reset conditions
  //after session go for break mode

  return (
    <section>
      <div>
        <div>
          <p id="timer-label" className="text-center fs-1 p-0 m-0">
            Session
          </p>
          <p id="time-left">
            {displayTime.mins}:{displayTime.seconds}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TimerDisplay;
