import React from "react";

const DisplayMessage = ({ title, message, setMessage, show = false }) => {
  if (show) document.getElementById("my_modal_1").showModal();
  return (
    <>
      {/* {show && ( */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setMessage("")}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* )} */}
    </>
  );
};

export default DisplayMessage;
