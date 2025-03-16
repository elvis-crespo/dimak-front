import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  background-color: ${({ theme }) => theme.bgSubtitle || "#007bff"};
  color: ${({ theme }) => theme.buttonText || "#fff"};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.bgSubtitleHover || "#0056b3"};
  }
`;

const ImagePreview = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: opacity 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
      background-color: rgba(0, 123, 255, 0.2);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      opacity: 0.6;
    }
  }
`;

const ImageUploader = ({ image, onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    onFileChange(file); // Enviar archivo al padre
  };

  return (
    <div>
      <Label htmlFor="file-upload">Agregar imagen</Label>
      <FileInput
        id="file-upload"
        name="installationPhoto"
        type="file"
        autoComplete="off"
        accept="image/*"
        onChange={handleFileChange}
      />

      {image && (
        <ImagePreview>
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            onClick={() => {
              Swal.fire({
                imageUrl: URL.createObjectURL(image),
                imageAlt: "Imagen",
                customClass: {
                  popup: "custom-swal-width",
                },
                showCloseButton: true,
              });
            }}
          />
        </ImagePreview>
      )}
    </div>
  );
};

export default ImageUploader;
