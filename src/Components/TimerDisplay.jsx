import { useEffect, useState, useRef } from "react";
import { calculateTimeLeft, displayTimeLeft, startTimer } from "../Functions";

const TimerDisplay = ({ parameters }) => {
  const {
    displayTime,
    setDisplayTime,
    trackLength,
    timerMode,
    setTimerMode,
    intervalIdRef,
    displayRef,
    initialRef,
  } = parameters;

  console.log(intervalIdRef.current);

  if (!displayRef.current && !intervalIdRef.current) {
    console.log(initialRef.current.session);
  }

  // UPDATE TIME DISPLAY FROM SESSION LENGTH OR BREAK LENGTH
  const updateDisplay = (trackLength) => {
    let timeLeftSeconds;
    if (timerMode.track == "session") {
      timeLeftSeconds = calculateTimeLeft(trackLength.sessionLength);
    } else if (timerMode.track == "break") {
      timeLeftSeconds = calculateTimeLeft(trackLength.breakLength);
    }
    // let timeLeftSeconds = calculateTimeLeft(trackLength.sessionLength);
    return displayTimeLeft(timeLeftSeconds);
  };
  const updateTime = updateDisplay(trackLength);

  useEffect(() => {
    console.log("inside update Timer useEffect");
    setDisplayTime({
      ...displayTime,
      mins: updateTime.mins,
      seconds: updateTime.seconds,
    });
  }, [trackLength.sessionLength, trackLength.breakLength]);

  // START TIMER FUNCTION

  useEffect(() => {
    console.log(timerMode);
    console.log("inside start timer useEffect");
    if (timerMode.status == "pause") {
      clearInterval(intervalIdRef.current);
    }

    if (timerMode.status == "on") {
      startTimer(
        initialRef,
        timerMode,
        setTimerMode,
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
  }, [timerMode]);

  return (
    <section>
      <div>
        <div>
          <p id="timer-label" className="text-center fs-1 p-0 m-0">
            {timerMode.track == "session" ? "Session" : "Break"}
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
