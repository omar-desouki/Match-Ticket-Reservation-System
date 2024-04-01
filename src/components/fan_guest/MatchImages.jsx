import React from "react";

const MatchImages = ({ match, imageWidth = 100 }) => {
  return (
    <>
      <figure>
        <div className="flex w-full flex-row">
          <div
            className={
              "grid flex-grow card min-h-32 bg-white rounded-box overflow-hidden place-items-center"
            }
          >
            <img
              src={"/images/" + match.homeTeam + ".jpg"}
              alt={match.homeTeam + "Logo"}
              className="object-contain"
              width={imageWidth}
            />
          </div>
          <div className="divider divider-horizontal w-2">VS</div>
          <div
            className={
              "grid flex-grow card min-h-32 bg-white rounded-box overflow-hidden place-items-center"
            }
          >
            <img
              src={"/images/" + match.awayTeam + ".jpg"}
              alt={match.awayTeam + "Logo"}
              className="object-contain"
              width={imageWidth}
            />
          </div>
        </div>
      </figure>
    </>
  );
};

export default MatchImages;
