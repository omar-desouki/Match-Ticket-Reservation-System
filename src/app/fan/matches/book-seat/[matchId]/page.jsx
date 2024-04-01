"use client";
import DisplayMessage from "@/src/components/fan_guest/DisplayMessage";
import StadiumShape from "@/src/components/fan_guest/StadiumShape";
import { useSession } from "next-auth/react";
// import { pusherClient } from "@/src/utils/pusher";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const BookSeat = ({ params }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  // Create a ref
  const container = useRef(null);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [match, setMatch] = useState({});
  const [seats, setSeats] = useState({});

  useEffect(() => {
    // Fetch match data
    fetch("/api/match/" + params.matchId)
      .then((res) => res.json())
      .then((match) => {
        setRows(match.stadium.stadiumId.shape.numOfRows);
        setCols(match.stadium.stadiumId.shape.numOfSeatsPerRow);
        setSeats(match.stadium.seats);
        setMatch(match);
      })
      .catch((error) => {
        console.log("error:", error);
        setMessage(
          "Failed to load match.\nYou will be redirected in 3 seconds."
        );
        setTimeout(() => {
          router.push("/fan/matches");
        }, 3000);
      });
  }, []);

  // useEffect(() => {
  //   // Listen for seat booking
  //   const handleBookSeat = (matchId, seats) => {
  //     console.log("Incoming seats: ", seats);
  //     setSeats(seats);
  //   };

  //   pusherClient
  //     .subscribe(`match-${params.matchId}`) // Subscribe to the channel
  //     .bind("book-seat", handleBookSeat); // Bind event to function

  //   // Listen for connection state changes
  //   pusherClient.connection.bind("state_change", function (states) {
  //     // states = {previous: 'oldState', current: 'newState'}
  //     alert(
  //       "States:\n previous:" + states.previous + ", current:" + states.current
  //     );
  //   });
  //   return () => {
  //     pusherClient.unsubscribe(`match-${params.matchId}`);
  //     pusherClient.unbind("book");
  //   };
  // }, []);

  const updateMatch = () => {
    // Update match data
    match.stadium.seats = seats;
    fetch("/api/user/" + session.user.username, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(match),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.stadium.seats);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  // useEffect(() => {
  //   // Update match data
  //   console.log("match", match);
  //   console.log("seats", seats);
  //   if (match.statdium) {
  //     match.stadium.seats = seats;
  //     fetch("/api/match/" + params.matchId, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(match),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data", data.stadium.seats);
  //       })
  //       .catch((error) => {
  //         console.log("error:", error);
  //       });
  //   }
  // }, [selectedSeat]);

  const handleSeatClick = (e, indexStr) => {
    const index = parseInt(indexStr);
    const userId = session.user._id;

    setSeats((prevSeats) => {
      // Do not update if seat is booked by another user
      if (prevSeats[index].booked && prevSeats[index].userId !== userId) {
        return prevSeats;
      }
      // Book seat if it is not booked
      if (!prevSeats[index].booked) {
        setSelectedSeat(index);

        // Unbook previously selected seat
        if (selectedSeat !== null) {
          const seats = {
            ...prevSeats,
            [selectedSeat]: { booked: false, userId: null },
            [index]: { booked: true, userId: userId },
          };
          setMatch((prevMatch) => {
            return {
              ...prevMatch,
              stadium: {
                ...prevMatch.stadium,
                seats: seats,
              },
            };
          });
          return seats;
        }
        const seats = {
          ...prevSeats,
          [index]: { booked: true, userId: userId },
        };
        setMatch((prevMatch) => {
          return {
            ...prevMatch,
            stadium: {
              ...prevMatch.stadium,
              seats: seats,
            },
          };
        });

        // Book selected seat
        return seats;
      }
      // Unbook seat if it is booked by the same user
      else return { ...prevSeats, [index]: { booked: false, userId: null } };
    });

    console.log("seats", seats);
    console.log("seats array", Object.keys(seats));
  };

  return (
    <>
      <DisplayMessage
        title={"Opps..."}
        message={message}
        setMessage={setMessage}
        show={message}
      />

      <StadiumShape
        seats={seats}
        container={container}
        rows={rows}
        cols={cols}
        handleSeatClick={handleSeatClick}
      />
      <div className="flex justify-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            updateMatch();
            router.push("/fan/matches");
          }}
        >
          Book
        </button>
      </div>
    </>
  );
};

export default BookSeat;
