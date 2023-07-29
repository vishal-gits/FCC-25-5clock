import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlay,
  faPause,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const StartStop = ({ parameters }) => {
  const { timerMode, setTimerMode, setTrackLength, sessionRef, breakRef } =
    parameters;

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
      setTimerMode(() => {
        return { ...timerMode, status: "pause" };
      });
      setTrackLength({
        sessionLength: sessionRef.current,
        breakLength: breakRef.current,
      });
    }
  };

  return (
    <div className="container w-50">
      <div className="row row-cols-3 justify-content-evenly">
        <button
          id="start_stop"
          className=" btn btn-primary w-25 col"
          onClick={handleClick}
        >
          {timerMode.status === "pause" ? (
            <FontAwesomeIcon icon={faPlay} />
          ) : (
            <FontAwesomeIcon icon={faPause} />
          )}
        </button>

        <button
          id="reset"
          className=" btn btn-primary w-25 col"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>
    </div>
  );
};

export default StartStop;
