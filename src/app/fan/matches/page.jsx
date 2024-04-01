"use client";
import React, { useState } from "react";
import MatchList from "@/src/components/fan_guest/MatchList";
import { styles } from "@/src/utils/styles";
import { useSearchParams } from "next/navigation";
import PaginationBar from "@/src/components/fan_guest/PaginationBar";

const FilterBar = ({ searchTerm, setSearchTerm, filter, setFilter }) => {
  const filterOptions = ["On Going", "Upcoming", "Finished"];

  return (
    <>
      <div className="h-20 flex justify-between items-center px-7 space-x-5">
        <div className="w-max">
          <label htmlFor="search" className="inline-block">
            Search
          </label>
          <input
            id="search"
            name="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by team"
            className={styles.inputs + " inline w-max ml-5"}
          />
        </div>
        <div className="w-max">
          <label htmlFor="filter" className="inline-block">
            Filter
            <select
              className={
                "select select-bordered" +
                styles.inputs +
                " inline-block w-max ml-5"
              }
              onChange={(e) => setFilter(e.target.value)}
            >
              {filterOptions.map((filter) => (
                <option key={filter} value={filter}>
                  {/* Captialize first letter */}
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  );
};

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("On Going");

  return (
    <>
      {/* <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
      /> */}

      <MatchList searchTerm={searchTerm} filter={filter} />

      <PaginationBar />
    </>
  );
};

export default Matches;
