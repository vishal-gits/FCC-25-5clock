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

  const initialRef = useRef({
    session: trackLength.sessionLength,
    break: trackLength.breakLength,
  });
  let intervalIdRef = useRef();
  let displayRef = useRef();
  let audioRef = useRef(null);

  const parameters = {
    trackLength,
    setTrackLength,
    displayTime,
    setDisplayTime,
    timerMode,
    setTimerMode,
    initialRef,
    intervalIdRef,
    displayRef,
    audioRef,
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
        <h1 className="text-center fontColor">25 + 5 Clock</h1>
        <Track parameters={parameters} />
        <TimerDisplay parameters={parameters} />
        <StartStop parameters={parameters} />
      </div>
    </div>
  );
}

export default App;
