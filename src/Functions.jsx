// SETS TRACKLENGTH
export const handleTrackLength = (event, setTrackLength, timerMode) => {
  if (timerMode.status == "pause") {
    let btnId = event.currentTarget.id;

    if (btnId === "break-decrement") {
      setTrackLength((prevValue) => {
        if (prevValue.breakLength > 1) {
          let newValue = +prevValue.breakLength - 1;
          return { ...prevValue, breakLength: newValue };
        } else {
          return prevValue;
        }
      });
    } else if (btnId === "break-increment") {
      setTrackLength((prevValue) => {
        if (prevValue.breakLength < 60) {
          let newValue = +prevValue.breakLength + 1;
          return { ...prevValue, breakLength: newValue };
        } else {
          return prevValue;
        }
      });
    } else if (btnId === "session-decrement") {
      setTrackLength((prevValue) => {
        if (prevValue.sessionLength > 1) {
          let newValue = +prevValue.sessionLength - 1;
          return { ...prevValue, sessionLength: newValue };
        } else {
          return prevValue;
        }
      });
    } else if (btnId === "session-increment") {
      setTrackLength((prevValue) => {
        if (prevValue.sessionLength < 60) {
          let newValue = +prevValue.sessionLength + 1;
          return { ...prevValue, sessionLength: newValue };
        } else {
          return prevValue;
        }
      });
    }
  }
};

//Functions required
//1. calculate time difference
//2.display time
//3.Update Timer Function set interval timer function , using both the above functions
//4. set initial state of display time

// TIMELEFT - To calculate total timeLeft based on startTime and currentTime in seconds
export const calculateTimeLeft = (mins = 0, seconds = 0) => {
  //both startTime and currentTime in seconds
  let timeLeftSeconds = Number(mins) * 60 + Number(seconds);
  return timeLeftSeconds;
};

// MINS & SECS FROM TIMELEFT--To calculate mins and seconds from time Left in seconds
export const displayTimeLeft = (timeLeftSeconds) => {
  let mins = Math.floor(timeLeftSeconds / 60);
  let seconds = Math.floor(timeLeftSeconds % 60);
  mins < 10 ? (mins = "0" + mins) : "";
  seconds < 10 ? (seconds = "0" + seconds) : "";
  mins = String(mins);
  seconds = String(seconds);
  return { mins, seconds };
};

//currentDisplayRef --- useRef, which will be equal to the displaytime, once calculated, and will also be utilised for breaking and resuming when it returns
export const startTimer = (
  audioRef,
  initialRef,
  timerMode,
  setTimerMode,
  intervalIdRef,
  displayRef,
  displayTime,
  setDisplayTime,
  startTime
) => {
  if (intervalIdRef.current == "trackCompleted") {
    console.log("audio starts");
    audioRef.current.play();
  }

  let timeLeftSeconds;
  // console.log(displayRef.current);

  // if (!displayRef.current && !intervalIdRef.current) {
  //   console.log(initialRef.current.session);
  // }

  //condition for first start-stop click
  // if (!displayRef.current && !intervalIdRef.current) {
  //   timeLeftSeconds = calculateTimeLeft(initialRef.current.session);
  // } else
  if (displayRef.current && intervalIdRef.current !== "trackCompleted") {
    // condition for starting after pause
    // console.log(intervalIdRef.current);
    // if (intervalIdRef.current !== "trackCompleted") {
    // console.log("inside-starting after pause");
    if (
      displayRef.current.mins == displayTime.mins &&
      displayRef.current.seconds == displayTime.seconds
    ) {
      timeLeftSeconds = calculateTimeLeft(
        displayRef.current.mins,
        displayRef.current.seconds
      );
      console.log(timeLeftSeconds);
    } else {
      timeLeftSeconds = calculateTimeLeft(
        displayTime.mins,
        displayTime.seconds
      );
      console.log(timeLeftSeconds);
    }
    // }
  } else {
    // other than 1st start and pause --- firing
    console.log(startTime);
    if (timerMode.track == "session") {
      console.log("inside session condition");
      timeLeftSeconds = calculateTimeLeft(startTime.sessionLength);
    } else if (timerMode.track == "break") {
      timeLeftSeconds = calculateTimeLeft(startTime.breakLength);
    }
  }
  // required to start new interval , not skipping the first count
  if (intervalIdRef.current == "trackCompleted") {
    timeLeftSeconds = timeLeftSeconds + 1;
  }

  console.log(timeLeftSeconds);
  // let timeLeftSeconds = calculateTimeLeft(startTime.sessionLength, currentTime);
  let counter = 0;
  intervalIdRef.current = setInterval(() => {
    if (timeLeftSeconds < 0) {
      clearInterval(intervalIdRef.current);
      console.log("completed");
      intervalIdRef.current = "trackCompleted";
      if (timerMode.track == "session") {
        setTimerMode({ ...timerMode, track: "break" });
      } else if (timerMode.track == "break") {
        setTimerMode({ ...timerMode, track: "session" });
      }
    } else {
      if (counter == 0) {
        timeLeftSeconds = timeLeftSeconds - 1;
      }
      // console.log(displayTimeLeft(timeLeftSeconds));
      displayRef.current = displayTimeLeft(timeLeftSeconds);
      // console.log(displayRef.current);
      setDisplayTime(() => {
        return {
          ...displayTime,
          mins: displayRef.current.mins,
          seconds: displayRef.current.seconds,
        };
      });
      timeLeftSeconds = timeLeftSeconds - 1;
      counter = counter + 1;
      console.log(displayRef.current, displayTime, intervalIdRef.current);
    }
  }, 1000);
};
