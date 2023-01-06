import React from "react";

export const showErrorMessage = (msg) => (
  <div className="alert alert-danger" role="alert">
  {msg}
  </div>
);

export const showSuccessMessage = (msg) => (
  <div className="alert alert-success" role="alert">
  {msg}
  </div>
);

export const getName = (lgUser, chatParticipants) => {
  return chatParticipants[0]._id == lgUser
    ? chatParticipants[1].name
    : chatParticipants[0].name;
};

export const getSenderId = (lgUser, chatParticipants) => {
  return chatParticipants[0]._id == lgUser
    ? chatParticipants[1]._id
    : chatParticipants[0]._id;
};