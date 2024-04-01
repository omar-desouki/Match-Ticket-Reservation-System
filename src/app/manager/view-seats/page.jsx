"use client";
import StadiumShape from "@/src/components/fan_guest/StadiumShape";
import { styles } from "@/src/utils/styles";
import React, { useEffect, useRef, useState } from "react";

const ViewSeats = () => {
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState(null);
  const container = useRef(null);

  useEffect(() => {
    fetch("/api/match/info/all-matches")
      .then((res) => res.json())
      .then((matchesList) => {
        setMatches(matchesList);
        setMatch(matchesList[0]);
      })
      .catch(() => {
        setMatches([]);
      });
  }, []);

  return (
    <>
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

      {match && (
        <>
          {console.log("match.stadium.seats", match.stadium.seats)}
          <StadiumShape
            seats={{ ...match.stadium.seats }}
            container={container}
            rows={match.stadium.stadiumId.shape.numOfRows}
            cols={match.stadium.stadiumId.shape.numOfSeatsPerRow}
            handleSeatClick={(e, index) => {}}
          />
        </>
      )}
    </>
  );
};

export default ViewSeats;
