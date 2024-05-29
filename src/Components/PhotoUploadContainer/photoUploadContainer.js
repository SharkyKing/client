import React, { useState, useRef } from 'react';
import './photoUploadContainer.css';
import { Buffer } from 'buffer';

function PhotoUploadContainer({setImageBuffer}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);

        const imageBuffer = Buffer.from(e.target.result.split(",")[1], "base64");
        setImageBuffer(imageBuffer)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="upload-container" onClick={handleContainerClick}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" />
        ) : (
          <span>Click to select photo</span>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
}

export default PhotoUploadContainer;
