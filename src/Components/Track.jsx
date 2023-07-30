import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { handleTrackLength } from "../Functions";

const Track = ({ parameters }) => {
  const { trackLength, setTrackLength, timerMode } = parameters;

  return (
    <section id="session" className="container border border-2 border-dark">
      <div className="row row-cols-2">
        <div className="col text-center" id="break-label">
          Break Length
          <div className="row row-cols-3 justify-content-around align-items-center border border-2 border-dark">
            <button
              id="break-decrement"
              className="col btn btn-primary w-25"
              onClick={(event) =>
                handleTrackLength(event, setTrackLength, timerMode)
              }
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <span
              id="break-length"
              className="fs-4 border border-2 border-dark"
            >
              {trackLength.breakLength}
            </span>
            <button
              id="break-increment"
              className="col btn btn-primary w-25"
              onClick={(event) =>
                handleTrackLength(event, setTrackLength, timerMode)
              }
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>

        <div className="col text-center" id="session-label">
          Session Length
          <div className="row row-cols-3 justify-content-around align-items-center border border-2 border-dark">
            <button
              id="session-decrement"
              className="col btn btn-primary w-25"
              onClick={(event) =>
                handleTrackLength(event, setTrackLength, timerMode)
              }
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
            <span
              id="session-length"
              className="fs-4 border border-2 border-dark"
            >
              {trackLength.sessionLength}
            </span>
            <button
              id="session-increment"
              className="col btn btn-primary w-25"
              onClick={(event) =>
                handleTrackLength(event, setTrackLength, timerMode)
              }
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Track;
