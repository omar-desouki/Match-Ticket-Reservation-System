"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const StadiumShape = ({ seats, container, rows, cols, handleSeatClick }) => {
  const { data: session } = useSession();
  useEffect(() => {
    container.current.style.setProperty(
      "grid-template-columns",
      `repeat(${cols}, minmax(0, 200px))`
    );
    container.current.style.setProperty(
      "grid-template-rows",
      // `repeat(${rows}, minmax(100px, 200px))`
      `repeat(${rows}, 100px)`
    );
    // console.log("seats", seats);
    // console.log("seats array", Object.keys(seats));
  }, [container, rows, cols]);

  const seatColor = (seat) => {
    if (seats[seat].booked) {
      if (seats[seat].userId === session.user._id) return "bg-red-500";
      else return "bg-secondary";
    } else return "bg-primary";
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-10/12 m-5 p-5 min-h-screen bg-secondary-content rounded-lg flex justify-center items-center">
          <div id="stadium" className="grid gap-2" ref={container}>
            {/* Attach the ref to the seat div */}
            {seats && (
              <>
                {/* seats to array */}
                {console.log("seats", seats)}
                {console.log("seats array", Object.keys(seats))}
                {Object.keys(seats).map((seat, index) => (
                  <button
                    key={index}
                    className={`seat rounded-md ${seatColor(
                      seat
                    )} text-primary-content font-medium hover:bg-accent hover:text-accent-content flex justify-center items-center`}
                    onClick={(e) => handleSeatClick(e, index)}
                  >
                    {Math.floor(index / cols) + 1},{(index % cols) + 1}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StadiumShape;
