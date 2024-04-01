"use client";
import React, { useEffect, useState } from "react";

const Countdown = ({ dateTime }) => {
    const now = new Date(Date.now());
    const matchDate = new Date(dateTime);
    const diffMilliSec = matchDate.getTime() - now.getTime();
    const pastDate = diffMilliSec <= 0;

    const yearDiff = matchDate.getFullYear() - now.getFullYear();
    const dateDiff = new Date(diffMilliSec);
    const moreThanAMonth = dateDiff.getMonth() > 0;
    const [date, setDate] = useState(dateDiff);

    useEffect(() => {
        console.log("now");
        console.log(now);
        console.log("matchDate");
        console.log(matchDate);
        console.log("date");
        console.log(date);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date(date - 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return (
        <>
            <div className="flex justify-center p-5">
                {pastDate ? (
                    <>
                        <h3 className="text-2xl">
                            Match has already started and/or Finished.
                        </h3>
                    </>
                ) : (
                    <>
                        {moreThanAMonth ? (
                            <>
                                <h3 className="text-2xl">
                                    This match will start in{" "}
                                    {yearDiff ? `${yearDiff} years and ` : ""}
                                    {date.getMonth()} months. Be Patient!
                                </h3>
                            </>
                        ) : (
                            <>
                                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                        <span className="countdown font-mono text-5xl">
                                            <span
                                                style={{
                                                    "--value": date.getDate(),
                                                }}
                                            ></span>
                                        </span>
                                        days
                                    </div>
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                        <span className="countdown font-mono text-5xl">
                                            <span
                                                style={{
                                                    "--value": date.getHours(),
                                                }}
                                            ></span>
                                        </span>
                                        hours
                                    </div>
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                        <span className="countdown font-mono text-5xl">
                                            <span
                                                style={{
                                                    "--value":
                                                        date.getMinutes(),
                                                }}
                                            ></span>
                                        </span>
                                        min
                                    </div>
                                    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                                        <span className="countdown font-mono text-5xl">
                                            <span
                                                style={{
                                                    "--value":
                                                        date.getSeconds(),
                                                }}
                                            ></span>
                                        </span>
                                        sec
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Countdown;
