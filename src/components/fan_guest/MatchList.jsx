"use client";
import { React, useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import { useSearchParams } from "next/navigation";
// import { revalidatePath } from "next/cache";

const MatchList = ({
  searchTerm = "",
  filter = "On Going",
  numMatches = 20,
}) => {
  const searchParams = useSearchParams();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10;

  useEffect(() => {
    fetch(
      "/api/match/?" +
        new URLSearchParams({
          team: searchTerm,
          page: page,
          itemsPerPage: itemsPerPage,
          filter: filter,
        })
    )
      .then((res) => res.json())
      .then((matchesList) => {
        setMatches(matchesList);
        setLoading(false);
      })
      .catch(() => setMatches([]));
  }, [searchTerm, page, itemsPerPage]);

  return (
    <>
      <div className="px-4 py-10 bg-accent-content">
        {/* Match Cards */}
        {/* <div className="flex justify-center align-middle space-x-5 max-md:flex-col flex-wrap"> */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,400px))] gap-5 justify-center align-middle overflow-hidden">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              {matches.length ? (
                matches.slice(0, numMatches).map((match) => {
                  return <MatchCard key={match._id} match={{ ...match }} />;
                })
              ) : (
                <>
                  <div className="text-center">
                    <h1 className="text-2xl font-bold p-5">No Matches</h1>
                    <p>Check your filter options.</p>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchList;
