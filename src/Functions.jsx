// SETS TRACKLENGTH
export const handleTrackLength = (event, setTrackLength) => {
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
};

//Functions required
//1. calculate time difference
//2.display time
//3.Update Timer Function set interval timer function , using both the above functions
//4. set initial state of display time

// TOTAL SECONDS--To calculate total seconds in a given mins, seconds combination
export const calculateSeconds = (mins = 0, seconds = 0) => {
  return mins * 60 + seconds;
};

// TIMELEFT - To calculate total timeLeft based on startTime and currentTime in seconds
export const calculateTimeLeft = (startTime, currentTime = 0) => {
  //both startTime and currentTime in seconds
  let startTimeSeconds = calculateSeconds(startTime);
  let currentTimeSeconds = calculateSeconds(currentTime);

  let timeLeftSeconds = startTimeSeconds - currentTimeSeconds;

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
  intervalIdRef,
  displayRef,
  displayTime,
  setDisplayTime,
  startTime,
  currentTime = 0
) => {
  let timeLeftSeconds = calculateTimeLeft(startTime.sessionLength, currentTime);

  intervalIdRef.current = setInterval(() => {
    if (timeLeftSeconds <= 40) {
      clearInterval(intervalIdRef.current);
    } else {
      timeLeftSeconds = timeLeftSeconds - 1;
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
    }
  }, 1000);
};
