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

  useEffect(() => {
    console.log(timerMode.status);
    if (timerMode.status == "pause") {
      console.log("p3");
      clearInterval(intervalIdRef.current);
    }

    if (timerMode.status == "on") {
      startTimer(
        intervalIdRef,
        displayRef,
        displayTime,
        setDisplayTime,
        trackLength
      );
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [timerMode.status]);

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
