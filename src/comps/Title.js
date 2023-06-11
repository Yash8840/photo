import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Title = () => {
  return (
    <div className="title">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Firebase Photo Manager</h1>
        <button
          style={{ height: "40px" }}
          onClick={() => {
            signOut(auth);
          }}>
          Log Out
        </button>
      </div>
      <h2>Your Pictures</h2>
      <p>Upload your pictures here</p>
    </div>
  );
};

export default Title;
