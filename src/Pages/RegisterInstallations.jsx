import { useForm } from "../Hooks/useForm";
import {
  Container,
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  StyledForm,
  SubmitButton,
  TextArea,
  Title,
} from "../components/CustomFormStyled";

import Swal from "sweetalert2";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainer } from "../components/Animations.jsx";
import { validateFields } from "../utils/validateFields.js";
import ImageUploader from "../components/ImageUploader.jsx";

export default function RegisterInstallations() {
  const { values, handleChange, resetForm } = useForm({
    plate: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null, // Campo para el archivo
  });
  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  // Función para manejar la imagen subida
  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };


  const HandleReset = () => {
    resetForm();
    setImage(null); // Limpia la imagen de la vista previa
    values.photoUrl = null; // Limpia el valor del archivo
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
    setErrors({});
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    // Validar cada campo usando las funciones de validación
    Object.keys(values).forEach((field) => {
      const error = validateFields[field](values[field]);
      if (error) {
        newErrors[field] = error; // Si hay error, lo agregamos al objeto newErrors
      }
    });

    return newErrors;
  };

  // Lógica de envío del formulario con Axios
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(); // Validar el formulario
    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores, no enviar el formulario y mostrar los errores
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    // Agregar los valores al FormData
    formData.append("photoUrl", values.photoUrl); // Archivo
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photoUrl") formData.append(key, value);
    });

    Swal.fire({
      title: "¿Deseas Guardar esta Instalación?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await HandleFetch(formData);

        if (response.isSuccess === true) {
          Swal.fire({
            title: "¡Guardado!",
            text: `Instalación con placa ${values.plate} ha sido guardada.`,
            icon: "success",
          });
          HandleReset();
        }
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  const HandleFetch = async (formData) => {
    const url = `/installation/register?plate=${values.plate}`;

    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al guardar la instalación: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      return error.response?.data; // Retornar el error desde el servidor si existe
    }
  };

  return (
    <Container>
      <AnimatedContainer>
        <FormContainer style={{ margin: "30px 0" }} id="register">
          <Title>Instalaciones de Vehículo</Title>
          <StyledForm onSubmit={handleFormSubmit}>
            <SectionTitle>Detalles de la Instalación</SectionTitle>

            <FormField>
              <Label htmlFor="plate">
                Placa <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="plate"
                name="plate"
                type="text"
                autoComplete="off"
                required={true}
                placeholder={"Ej. AAA-1234 o AA-123A."}
                value={values.plate}
                onChange={handleChange}
              />
              {errors.plate && (
                <span style={{ color: "red" }}>{errors.plate}</span>
              )}
            </FormField>

            <div
              style={{
                borderTop: "1px solid #ccc",
              }}
            />

            <FormField>
              <Label htmlFor="technicalFileNumber">
                Nº de Ficha Técnica <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="technicalFileNumber"
                name="technicalFileNumber"
                type="text"
                autoComplete="off"
                required={true}
                value={values.technicalFileNumber}
                onChange={handleChange}
              />
              {errors.technicalFileNumber && (
                <span style={{ color: "red" }}>
                  {errors.technicalFileNumber}
                </span>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="invoiceNumber">Nº de Factura</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                type="text"
                autoComplete="off"
                placeholder={"Ej. 001-001-123456789."}
                value={values.invoiceNumber}
                onChange={handleChange}
              />
              {errors.technicianName && (
                <span style={{ color: "red" }}>{errors.invoiceNumber}</span>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="technicianName">Técnico</Label>
              <Input
                id="technicianName"
                name="technicianName"
                type="text"
                autoComplete="off"
                value={values.technicianName}
                onChange={handleChange}
              />
              {errors.technicianName && (
                <span style={{ color: "red" }}>{errors.technicianName}</span>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="date">
                Fecha <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                autoComplete="off"
                required
                value={values.date ? values.date.split("T")[0] : ""}
                onChange={handleChange}
              />
              {errors.date && (
                <span style={{ color: "red" }}>{errors.date}</span>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="installationCompleted">
                Instalación Completada
              </Label>
              <TextArea
                id="installationCompleted"
                name="installationCompleted"
                placeholder="Escribe una descripción"
                value={values.installationCompleted}
                onChange={handleChange}
              />
              {errors.installationCompleted && (
                <span style={{ color: "red" }}>
                  {errors.installationCompleted}
                </span>
              )}
            </FormField>

            <FormField>
              <Label htmlFor="installationPhoto">Foto de Instalación</Label>
              <ImageUploader onFileChange={handleFileChange} image={image}/>
              {errors.photoUrl && (
                <span style={{ color: "red" }}>{errors.photoUrl}</span>
              )}
            </FormField>


            <SubmitButton type="submit">Enviar</SubmitButton>
          </StyledForm>
        </FormContainer>
      </AnimatedContainer>
    </Container>
  );
}
