"use client";
import Countdown from "@/src/components/fan_guest/Countdown";
import DisplayMessage from "@/src/components/fan_guest/DisplayMessage";
import Match from "@/src/components/fan_guest/Match";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MatchDetails = ({ params }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [message, setMessage] = useState("");
  const [match, setMatch] = useState("");

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

  useEffect(() => {
    console.log("params.matchId:", params.matchId);
    fetch("/api/match/" + params.matchId)
      .then((res) => res.json())
      .then((match) => {
        setMatch(match);
      })
      .catch((error) => {
        console.log("error:", error);
        setMessage(
          "It might be deleted.\nYou will be redirected in 3 seconds."
        );
        setTimeout(() => {
          router.push("/fan/matches");
        }, 3000);
      });
  }, []);
  return (
    <>
      <DisplayMessage
        title="Opps... Match not found."
        show={message}
        message={message}
      />

      <Match match={match} />
    </>
  );
};

export default MatchDetails;
