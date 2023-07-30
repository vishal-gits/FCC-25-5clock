import { useEffect, useState, useRef } from "react";
import { calculateTimeLeft, displayTimeLeft, startTimer } from "../Functions";

const TimerDisplay = ({ parameters }) => {
  const {
    displayTime,
    setDisplayTime,
    trackLength,
    timerMode,
    intervalIdRef,
    displayRef,
  } = parameters;

  // let intervalIdRef = useRef();
  // let displayRef = useRef();

  //UPDATE TIME DISPLAY FROM SESSION LENGTH
  const updateDisplay = (trackLength) => {
    let timeLeftSeconds = calculateTimeLeft(trackLength.sessionLength);
    return displayTimeLeft(timeLeftSeconds);
  };
  const updateTime = updateDisplay(trackLength);

  useEffect(() => {
    // if(timerMode.status=='pause'){}
    // console.log("inside updateTime useEffect");
    setDisplayTime({
      ...displayTime,
      mins: updateTime.mins,
      seconds: updateTime.seconds,
    });
  }, [trackLength.sessionLength, trackLength.breakLength]);

  // START TIMER FUNCTION

  useEffect(() => {
    console.log(timerMode.status);
    if (timerMode.status == "pause") {
      clearInterval(intervalIdRef.current);
      console.log(displayRef.current, displayTime);
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
