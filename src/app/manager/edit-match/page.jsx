"use client";
import { useEffect, useState } from "react";
import { styles } from "@/src/utils/styles";
import DisplayMessage from "@/src/components/fan_guest/DisplayMessage";
import { validValues } from "@/src/utils/validation";

const EditMatchForm = () => {
  const [message, setMessage] = useState("");
  const [stadiums, setStadium] = useState([]);
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState(null);

  const [matchForm, setMatchForm] = useState({
    _id: "",
    homeTeam: validValues.teams[0],
    awayTeam: validValues.teams[1],
    stadium: {
      stadiumId: stadiums[0]?._id,
      seats: "",
    },
    dateTime: new Date(Date.now()),
    mainReferee: match?.mainReferee,
    linesmen: {
      firstLineman: match?.linesmen.firstLineman,
      secondLineman: match?.linesmen.secondLineman,
    },
  });

  useEffect(() => {
    fetch("/api/match/info/all-matches")
      .then((res) => res.json())
      .then((matchesList) => {
        setMatches(matchesList);
        setMatch(matchesList[0]);
        setMatchForm({
          _id: matchesList[0]._id,
          homeTeam: matchesList[0].homeTeam,
          awayTeam: matchesList[0].awayTeam,
          stadium: {
            stadiumId: matchesList[0].stadium.stadiumId,
            seats: matchesList[0].stadium.seats,
          },
          dateTime: matchesList[0].dateTime,
          mainReferee: matchesList[0].mainReferee,
          linesmen: {
            firstLineman: matchesList[0].linesmen.firstLineman,
            secondLineman: matchesList[0].linesmen.secondLineman,
          },
        });
      })
      .catch(() => {
        setMatches([]);
      });

    fetch("/api/stadium")
      .then((res) => res.json())
      .then((stadiums) => {
        setStadium(stadiums);
      })
      .catch((error) => {
        console.log("error:", error);
        setMessage("Failed to load stadiums.\nPlease try again later.");
      });
  }, []);

  const handleInputChange = (field, value) => {
    // let otherTeam = field === "homeTeam" ? "awayTeam" : "homeTeam";

    setMatchForm((prev) => {
      return {
        ...prev,
        [field]: value,
        // [otherTeam]: validValues.teams.filter((team) => team !== value)[0],
      };
    });
  };

  const handleStadiumInputChange = (field, value) => {
    console.log("field", field);
    setMatchForm({
      ...matchForm,
      stadium: {
        ...matchForm.stadium,
        [field]: value,
      },
    });
  };

  const handleLinesmenInputChange = (line, value) => {
    setMatchForm({
      ...matchForm,
      linesmen: {
        ...matchForm.linesmen,
        [line]: value,
      },
    });
  };

  const updateMatch = async (e) => {
    e.preventDefault();

    console.log("matchForm ", matchForm);

    fetch("/api/match/" + matchForm._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchForm),
    })
      .then((data) => {
        console.log("data", data);
        if (data.ok) {
          setMessage("Match Added Successfully");
        } else setMessage(data.text());
      })
      .catch((error) => {
        console.log("error:", error);
        setMessage(error);
      });

    setMatchForm((prev) => {
      return {
        ...prev,
        homeTeam: validValues.teams[0],
        awayTeam: validValues.teams[1],
        stadium: {
          stadiumId: stadiums[0]?._id,
          seats: "",
        },
        dateTime: prev.dateTime,
        mainReferee: prev.mainReferee,
        linesmen: {
          firstLineman: prev.linesmen.firstLineman,
          secondLineman: prev.linesmen.secondLineman,
        },
      };
    });
  };

  return (
    <>
      <DisplayMessage
        title="Status"
        message={message}
        setMessage={setMessage}
        show={message}
      />
      <h1 className="text-2xl font-bold text-center">Edit Match</h1>

      {/* Matches dropdown */}
      <div>
        <label
          htmlFor="homeTeam"
          className="block text-sm font-medium leading-6"
        >
          Select Match
          <div className="label">
            <span className="label-text">Pick the match to view.</span>
            <span className="label-text-alt">Required</span>
          </div>
        </label>
        <select
          className={"select select-bordered " + styles.inputs + " w-full"}
          onChange={(e) => {
            console.log("value", JSON.parse(e.target.value));
            setMatch(JSON.parse(e.target.value));
            setMatchForm(JSON.parse(e.target.value));
          }}
          required
        >
          {matches.map((team) => (
            <option key={team._id} value={JSON.stringify(team)}>
              {console.log("team", team)}
              {/* Captialize first letter */}
              {team.homeTeam.charAt(0).toUpperCase() +
                team.homeTeam.slice(1)}{" "}
              vs{" "}
              {team.awayTeam.charAt(0).toUpperCase() + team.awayTeam.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center my-10">
        <form
          className="space-y-6 w-2/4  flex-column my-10"
          onSubmit={updateMatch}
        >
          <div>
            <label htmlFor="id" className="block text-sm font-medium leading-6">
              Match Id
            </label>
            <div className="mt-2">
              <input
                id="id"
                name="id"
                type="text"
                autoComplete="id"
                required
                value={matchForm._id}
                disabled
                className={styles.inputs + " w-full"}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="homeTeam"
              className="block text-sm font-medium leading-6"
            >
              Home Team <span>*</span>
              <div className="label">
                <span className="label-text">Pick a Home Team.</span>
                <span className="label-text-alt">Required</span>
              </div>
            </label>
            <select
              className={"select select-bordered " + styles.inputs + " w-full"}
              value={matchForm.homeTeam}
              onChange={(e) => handleInputChange("homeTeam", e.target.value)}
              required
            >
              {validValues.teams.map((team) => (
                <option key={team} value={team}>
                  {/* Captialize first letter */}
                  {team.charAt(0).toUpperCase() + team.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="awayTeam"
              className="block text-sm font-medium leading-6"
            >
              Away Team <span>*</span>
              <div className="label">
                <span className="label-text">Pick a Aywa Team.</span>
                <span className="label-text-alt">Required</span>
              </div>
            </label>
            <select
              className={"select select-bordered " + styles.inputs + " w-full"}
              value={matchForm.awayTeam}
              onChange={(e) => handleInputChange("aywaTeam", e.target.value)}
              required
            >
              {validValues.teams
                .filter((team) => team !== matchForm.homeTeam)
                .map((team) => (
                  <option key={team} value={team}>
                    {/* Captialize first letter */}
                    {team.charAt(0).toUpperCase() + team.slice(1)}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="stadium"
              className="block text-sm font-medium leading-6"
            >
              Stadiums <span>*</span>
              <div className="label">
                <span className="label-text">Pick a stadium.</span>
                <span className="label-text-alt">Required</span>
              </div>
            </label>
            <select
              className={"select select-bordered " + styles.inputs + " w-full"}
              onChange={(e) =>
                handleStadiumInputChange("stadiumId", e.target.value)
              }
              required
            >
              {stadiums.map((stadium) => (
                <option key={stadium._id} value={stadium._id}>
                  {/* Captialize first letter */}
                  {stadium.stadiumName.charAt(0).toUpperCase() +
                    stadium.stadiumName.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
            <label
              htmlFor="seats"
              className="block text-sm font-medium leading-6"
            >
              Seats
            </label>
            <div className="mt-2">
              <input
                id="seats"
                name="seats"
                type="text"
                autoComplete="seats"
                required
                value={matchForm.stadium.seats}
                onChange={(e) =>
                  handleStadiumInputChange("seats", e.target.value)
                }
                className={styles.inputs + " w-full"}
              />
            </div>
          </div> */}
          <div>
            <label
              htmlFor="dateTime"
              className="block text-sm font-medium leading-6"
            >
              Date and Time
            </label>
            <div className="mt-2">
              <input
                id="dateTime"
                name="dateTime"
                type="datetime-local"
                required
                value={new Date(matchForm.dateTime).toISOString().slice(0, -1)}
                // onChange={(e) => handleInputChange("dateTime", e.target.value)}
                onChange={(e) => {
                  setMatchForm((prev) => {
                    return {
                      ...prev,
                      dateTime: e.target.value,
                    };
                  });
                }}
                className={styles.inputs + " w-full"}
                min={new Date().toISOString().split("T")[0]}
              />
              {console.log("matchForm.dateTime", matchForm.dateTime)}
            </div>
          </div>
          <div>
            <label
              htmlFor="mainReferee"
              className="block text-sm font-medium leading-6"
            >
              Main Referee
            </label>
            <div className="mt-2">
              <input
                id="mainReferee"
                name="mainReferee"
                type="text"
                autoComplete="mainReferee"
                required
                value={matchForm.mainReferee}
                onChange={(e) =>
                  handleInputChange("mainReferee", e.target.value)
                }
                className={styles.inputs + " w-full"}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="firstLineman"
              className="block text-sm font-medium leading-6"
            >
              First Linesman
            </label>
            <div className="mt-2">
              <input
                id="firstLineman"
                name="firstLineman"
                type="text"
                autoComplete="firstLineman"
                required
                value={matchForm.linesmen.firstLineman}
                onChange={(e) =>
                  handleLinesmenInputChange("firstLineman", e.target.value)
                }
                className={styles.inputs + " w-full"}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="secondLineman"
              className="block text-sm font-medium leading-6"
            >
              Second Linesman
            </label>
            <div className="mt-2">
              <input
                id="secondLineman"
                name="secondLineman"
                type="text"
                autoComplete="secondLineman"
                required
                value={matchForm.linesmen.secondLineman}
                onChange={(e) =>
                  handleLinesmenInputChange("secondLineman", e.target.value)
                }
                className={styles.inputs + " w-full"}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Match
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMatchForm;
