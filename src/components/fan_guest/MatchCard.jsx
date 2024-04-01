"use client";
import Link from "next/link";
import React from "react";
import MatchImages from "./MatchImages";

const MatchCard = ({ match }) => {
  const date = new Date(match.dateTime).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="card w-96 h-96 bg-base-100 shadow-2xl transition-all ease-in-out delay-100 duration-300 hover:w-[400px] hover:h-[400px] hover:-translate-x-2 hover:-translate-y-2 hover:p-1">
        <MatchImages match={match} />
        <div className="card-body">
          <h2 className="card-title">
            {match.homeTeam} vs {match.awayTeam}
          </h2>
          <p>
            {match.homeTeam} vs {match.awayTeam} on{" "}
            {match.stadium.stadiumId.stadiumName}. <br />
            Get ready for an epic showdown at <br />
            {date}!
          </p>
          <div className="card-actions justify-end">
            <Link
              href={"/fan/matches/" + match._id}
              className="btn btn-primary"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchCard;
