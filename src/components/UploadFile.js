import React, { useState } from "react";
import axios from "axios";
import "./UploadFile.css";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  let handleChange;
  handleChange = event => {
    const reader = new FileReader();
    // Wait for the file to be loaded
    reader.addEventListener("load", function() {
      console.log(this);
      setFilePreview(reader.result);
    });
    // Then display the preview
    reader.readAsDataURL(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const sendFile = () => {
    if (selectedFile) {
      const data = new FormData();
      data.append("file", selectedFile);
      const url = "http://localhost:8000/upload";
      axios({
        method: "post",
        data,
        url,
        headers: { "Access-Control-Allow-Origin": "http://localhost:3000" | "*" }
      }).then(() => {
        alert("Success");
      });
    }
    else alert("You must select an image")
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
      <button className="sendButton" onClick={sendFile}>
        Send
      </button>
      <div className="previewContainer">
        {filePreview ? (
          <img className="imagePreview" src={filePreview} alt="Preview" />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
