/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
    width: 200px;
    height: 200px;
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

const ImageUploader = ({ image, onFileChange, title}) => {
  const [preview, setPreview] = useState(image); // Inicialmente, asignamos la imagen del backend

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === "string") {
      setPreview(image); // Mantener la URL del backend
    } else if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      // Limpiar URL cuando cambie la imagen o el componente se desmonte
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]); // Solo actualizamos si cambia la imagen

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

      if (file && file.type.startsWith("image/")) {
      onFileChange(file); // Enviar archivo al padre
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  return (
    <div>
      <Label htmlFor="file-upload">{title}</Label>
      <FileInput
        id="file-upload"
        name="installationPhoto"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      {preview && (
        <ImagePreview>
          <img
            src={preview}
            alt="preview"
            onClick={() => {
              Swal.fire({
                imageUrl: preview,
                imageAlt: "Imagen",
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