import React, { useState } from "react";
import axios from "axios";
import './UploadFile.css';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  let handleChange;
  handleChange = event => {
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      console.log(this);
      setFilePreview(reader.result);
    });
    reader.readAsDataURL(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const sendFile = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    const url = "http://localhost:8000/upload";
    axios({
      method: "post",
      data,
      url,
      headers: { "Access-Control-Allow-Origin": "http://localhost:3000" | '*'}
    })
      .then(
        alert('Success')
      );
  };

  return (
    <div className="uploadImageContainer">
      <h1>UPLOAD FILE</h1>
      <input
        accept=".jpeg,.jpg,.png"
        type="file"
        name="file"
        onChange={handleChange}
      />
      <button onClick={sendFile}>Send</button>
      {filePreview ? <img className="imagePreview" src={filePreview} alt="Preview" /> : null}
    </div>
  );
};

export default UploadFile;
