import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    console.log(e.target.files);
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      // since we need to update if user didn't click "cancle" while selecting
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file(png or jpeg)");
    }
  };
  return (
    <form className=".imgForm">
      <label className="imgLabel">
        <input className="imgInput" type="file" onChange={changeHandler} />
        <span style={{ position: "relative", left: "8px" }}>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;
