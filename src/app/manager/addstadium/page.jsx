"use client";
import React, { useState } from "react";
import { createstadium } from "@/src/app/api/actions/stadium";
import { styles } from "@/src/utils/styles";
import DisplayMessage from "@/src/components/fan_guest/DisplayMessage";

const StadiumForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [stadiumForm, setStadiumForm] = useState({
    stadiumName: "",
    shape: {
      numOfRows: "",
      numOfSeatsPerRow: "",
    },
  });

  const [stadiumErrors, setStadiumErrors] = useState({
    stadiumName: "",

    numOfRows: "",
    numOfSeatsPerRow: "",
  });

  const handleInputChange = (field, value) => {
    if (field == "stadiumName") {
      setStadiumForm({
        ...stadiumForm,
        [field]: value,
      });
    } else {
      setStadiumForm({
        ...stadiumForm,
        shape: {
          ...stadiumForm.shape,
          [field]: value,
        },
      });
    }

    setStadiumErrors({
      ...stadiumErrors,
      [field]: "",
    });
  };

  const validateStadiumInputs = () => {
    const errors = {};

    if (!stadiumForm.stadiumName.trim()) {
      errors.stadiumName = "Stadium Name is required.";
    } else if (stadiumForm.stadiumName.length > 20) {
      errors.stadiumName = "Stadium Name must be at most 20 characters.";
    }

    const numOfRows = parseInt(stadiumForm.shape.numOfRows, 10);
    if (isNaN(numOfRows) || numOfRows < 1 || numOfRows > 5) {
      errors.numOfRows = "Number of Rows must be between 1 and 5.";
    }

    const numOfSeatsPerRow = parseInt(stadiumForm.shape.numOfSeatsPerRow, 10);
    if (
      isNaN(numOfSeatsPerRow) ||
      numOfSeatsPerRow < 1 ||
      numOfSeatsPerRow > 30
    ) {
      errors.numOfSeatsPerRow =
        "Number of Seats Per Row must be between 1 and 30.";
    }

    setStadiumErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addStadium = async (e) => {
    e.preventDefault();

    if (validateStadiumInputs()) {
      //   try {
      console.log(stadiumForm);
      const res = await fetch("/api/stadium/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stadiumForm),
      })
        // .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
          setMessage(data.text());
          //   router.push("/manager/add-stadium")
        })
        .catch((err) => {
          console.log("err: ", err);
          setMessage(err.message);
        });

      //     if (res.ok) {
      //       const data = await res.json();
      //       console.log("data: ", data);
      //     } else {
      //       console.log("Failed to add stadium");
      //     }
      //   } catch (err) {
      //     console.error("Error adding stadium:", err);
      //   }
    }
  };

  return (
    <div className="flex justify-center my-10">
      <DisplayMessage
        title="Status"
        message={message}
        setMessage={setMessage}
        show={message}
      />

      <form
        className="space-y-6 w-2/4  flex-column my-10"
        onSubmit={addStadium}
      >
        <div>
          <label
            htmlFor="stadiumName"
            className="block text-sm font-medium leading-6"
          >
            Stadium Name
          </label>
          <div className="mt-2">
            <input
              id="stadiumName"
              name="stadiumName"
              type="text"
              autoComplete="stadiumName"
              required
              value={stadiumForm.stadiumName}
              onChange={(e) => handleInputChange("stadiumName", e.target.value)}
              className={`${styles.inputs} w-full ${
                stadiumErrors.stadiumName ? "border-red-500" : ""
              }`}
            />
            {stadiumErrors.stadiumName && (
              <p className="text-red-500 text-xs mt-1">
                {stadiumErrors.stadiumName}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="numOfRows"
            className="block text-sm font-medium leading-6"
          >
            Number of Rows
          </label>
          <div className="mt-2">
            <input
              id="numOfRows"
              name="numOfRows"
              type="number"
              autoComplete="numOfRows"
              required
              value={stadiumForm.shape.numOfRows}
              onChange={(e) => handleInputChange("numOfRows", e.target.value)}
              className={`${styles.inputs} w-full ${
                stadiumErrors.numOfRows ? "border-red-500" : ""
              }`}
            />
            {stadiumErrors.numOfRows && (
              <p className="text-red-500 text-xs mt-1">
                {stadiumErrors.numOfRows}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="numOfSeatsPerRow"
            className="block text-sm font-medium leading-6"
          >
            Number of Seats Per Row
          </label>
          <div className="mt-2">
            <input
              id="numOfSeatsPerRow"
              name="numOfSeatsPerRow"
              type="number"
              autoComplete="numOfSeatsPerRow"
              required
              value={stadiumForm.shape.numOfSeatsPerRow}
              onChange={(e) =>
                handleInputChange("numOfSeatsPerRow", e.target.value)
              }
              className={`${styles.inputs} w-full ${
                stadiumErrors.numOfSeatsPerRow ? "border-red-500" : ""
              }`}
            />
            {stadiumErrors.numOfSeatsPerRow && (
              <p className="text-red-500 text-xs mt-1">
                {stadiumErrors.numOfSeatsPerRow}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Stadium
          </button>
        </div>
      </form>
    </div>
  );
};

export default StadiumForm;
