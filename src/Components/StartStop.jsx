import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateTimeLeft, displayTimeLeft } from "../Functions";

import {
  faPlay,
  faPause,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const StartStop = ({ parameters }) => {
  const {
    timerMode,
    setTimerMode,
    setTrackLength,
    initialRef,
    displayTime,
    setDisplayTime,
    intervalIdRef,
    displayRef,
    audioRef,
  } = parameters;

  const handleClick = (e) => {
    let btnId = e.currentTarget.id;
    if (btnId == "start_stop") {
      if (timerMode.status == "pause") {
        setTimerMode(() => {
          return { ...timerMode, status: "on" };
        });
      } else {
        setTimerMode({ ...timerMode, status: "pause" });
      }
    }
    if (btnId == "reset") {
      clearInterval(intervalIdRef.current);
      displayRef.current = "";
      setTimerMode(() => {
        return { ...timerMode, status: "pause", track: "session" };
      });
      setTrackLength({
        sessionLength: initialRef.current.session,
        breakLength: initialRef.current.break,
      });

      const updateDisplay = (initialRef) => {
        let timeLeftSeconds = calculateTimeLeft(initialRef.current.session);
        return displayTimeLeft(timeLeftSeconds);
      };
      const updateTime = updateDisplay(initialRef);

      setDisplayTime({
        ...displayTime,
        mins: updateTime.mins,
        seconds: updateTime.seconds,
      });

      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="container w-50">
      <div className="row row-cols-3 justify-content-evenly">
        <button
          id="start_stop"
          className=" w-25 custombg col"
          onClick={handleClick}
        >
          {timerMode.status === "pause" ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>

        <button id="reset" className=" w-25 custombg col" onClick={handleClick}>
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>
    </div>
  );
};

export default StartStop;
