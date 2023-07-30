import { useState, useRef } from "react";
import Track from "./Components/Track";
import StartStop from "./Components/StartStop";
import TimerDisplay from "./Components/TimerDisplay";

function App() {
  const [trackLength, setTrackLength] = useState({
    sessionLength: "25",
    breakLength: "5",
  });
  const [displayTime, setDisplayTime] = useState({ mins: "", seconds: "" });
  const [timerMode, setTimerMode] = useState({
    status: "pause",
    track: "session",
  });

  const sessionRef = useRef(trackLength.sessionLength);
  const breakRef = useRef(trackLength.breakLength);
  let intervalIdRef = useRef();
  let displayRef = useRef();
  const resetRef = useRef(false);

  // console.log(sessionRef.current, "&", breakRef.current);

  const parameters = {
    trackLength,
    setTrackLength,
    displayTime,
    setDisplayTime,
    timerMode,
    setTimerMode,
    sessionRef,
    breakRef,
    resetRef,
    intervalIdRef,
    displayRef,
  };

  return (
    <div
      id="outer"
      className="container-fluid d-flex align-items-center justify-content-center"
    >
      <div
        id="inner"
        className="container d-flex flex-column align-items-center justify-content-around"
      >
        <h1 className="display-3 text-center">25 + 5 Clock</h1>
        <Track parameters={parameters} />
        <TimerDisplay parameters={parameters} />
        <StartStop parameters={parameters} />
      </div>
    </div>
  );
}

export default App;
