import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Countdown from "./Countdown";
import MatchImages from "./MatchImages";

const Match = ({ match, canBook = true }) => {
  console.log("match:", match);

  const { data: session, status } = useSession();

  const date = new Date(match.dateTime).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const diffMilliSec = new Date(match.dateTime) - new Date(Date.now());
  const pastMatch = diffMilliSec <= 0;
  const dateDiff = new Date(diffMilliSec);
  const moreThanAMonth = dateDiff.getMonth() > 0;

  return (
    <>
      <div className="min-h-screen">
        {match && (
          <>
            {/* Overview Section */}
            <section className="flex p-5 justify-evenly items-center min-h-[50vh] max-md:flex-col space-y-10">
              {/* Teams Images */}
              <div className="m-2">
                <MatchImages match={match} imageWidth={200} />
              </div>

              <div className="text-left max-md:text-center space-y-2">
                {/* Teams Names */}
                <h1 className="text-4xl font-bold ">
                  {match.homeTeam} vs {match.awayTeam}
                </h1>
                {/* Desctiption */}
                <p className="py-2 text-md">
                  {match.homeTeam} vs {match.awayTeam} on{" "}
                  {match.stadium.stadiumId.stadiumName}. <br />
                  Get ready for an epic showdown at {date}!
                </p>

                {/* CTA */}
                {canBook && (
                  <>
                    {pastMatch || moreThanAMonth ? (
                      <>
                        <Link
                          href="/fan/matches"
                          className="btn btn-primary h-max px-4 text-lg font-bold"
                        >
                          Explore Different Matches
                        </Link>
                      </>
                    ) : (
                      <>
                        {status === "unauthenticated" ? (
                          <>
                            <>
                              {/* TODO... */}
                              <Link
                                href={`/fan/login?callbackUrl=${usePathname()}`}
                                className="btn btn-primary h-max px-4 text-lg font-bold"
                              >
                                Login to book your seat!
                              </Link>
                            </>
                          </>
                        ) : (
                          <>
                            <Link
                              href={"/fan/matches/book-seat/" + match._id}
                              className="btn btn-primary h-max px-4 text-lg font-bold"
                            >
                              Book Your Seat!
                            </Link>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </section>
            {/* Countdown Section */}
            <section className="p-5">
              <h2 className="text-3xl font-bold text-center">
                Match Starts in ...
              </h2>
              <Countdown dateTime={match.dateTime} />
            </section>

            <section className="p-5">
              <h2 className="text-3xl font-bold text-center p-5">Referees</h2>
              {/* <div className="rounded-box md:space-x-5 flex justify-center items-center m-5 max-md:flex-col max-md:space-y-5"> */}
              <div className="grid justify-center grid-cols-[repeat(2,minmax(0,200px))] gap-2 rounded-box">
                <div className="col-span-2 bg-primary h-32 w-full rounded-md flex flex-col justify-center items-center">
                  Main Referee
                  <h2 className="text-xl font-bold">{match.mainReferee}</h2>
                </div>
                <div className="bg-primary h-32 w-full rounded-md flex flex-col justify-center items-center">
                  First Lineman
                  <h2 className="text-xl font-bold">
                    {match.linesmen.firstLineman}
                  </h2>
                </div>
                <div className="bg-primary h-32 w-full rounded-md flex flex-col justify-center items-center">
                  Second Lineman
                  <h2 className="text-xl font-bold">
                    {match.linesmen.secondLineman}
                  </h2>
                </div>
              </div>
            </section>

            {/* Details Section */}
            {/* Stadium */}
            {/* Date & Time */}
            {/* Seats */}
            {/* Price */}
            {/* Register Section */}
            {/* What are tou waiting for? Clock is ticking! Claim your seat before anybody else */}
            {/* Book Seat Button */}
          </>
        )}
      </div>
    </>
  );
};

export default Match;
