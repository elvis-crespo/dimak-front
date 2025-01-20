import { useForm } from "../Hooks/useForm";
import {
  Container,
  FormContainer,
  FormField,
  Input,
  InputFile,
  Label,
  SectionTitle,
  StyledForm,
  SubmitButton,
  TextArea,
  Title,
} from "../components/CustomFormStyled";

import axios from "axios";
import { API_BASE_URL } from "../utils/config";
import Swal from "sweetalert2";

import { useState } from "react";
import { validateFields } from "../utils/validateFields.JS";

export default function RegisterInstallations() {
  const { values, handleChange, resetForm } = useForm({
    plate: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    File: null, // Campo para el archivo
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});

  // Manejo del cambio del archivo
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]; // Validar archivo

    if (!file) {
      console.error("No se seleccionó ningún archivo");
      return;
    }

    values.File = file; // Guardar el archivo en los valores del formulario
  };

  const HandleReset = () => {
    resetForm(); // Resetea los valores controlados por el hook
    values.File = null; // Limpia el valor del archivo
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

    // if (!values.File) {
    //   console.error("No se ha seleccionado un archivo");
    //   return;
    // }

    const formData = new FormData();

    // Agregar los valores al FormData
    formData.append("File", values.File); // Archivo
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "File") formData.append(key, value);
    });

    // Confirmación de SweetAlert
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
        console.log("resultado ", response);

        if (response.isSuccess === true) {
          // Si la respuesta es exitosa, mostramos un SweetAlert de éxito
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
    const url = `${API_BASE_URL}/installation/save?plate=${values.plate}&InstallationCompleted=${values.installationCompleted}&TechnicianName=${values.technicianName}&Date=${values.date}`;

    try {
      // Enviar solicitud con Axios
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Indicar que es un envío con archivos
        },
      });

      return response.data; // Retornar datos del servidor
    } catch (error) {
      // Verificar si el error es de red o de conexión
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        // Otro error sin respuesta del servidor
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        // Error con respuesta del servidor (404, 500, etc.)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al guardar la instalación: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      console.error("Error al enviar los datos de instalación:", error);

      return error.response?.data; // Retornar el error desde el servidor si existe
    }
  };

  return (
    <Container id="register">
      <FormContainer style={{ margin: "30px 0" }}>
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
              required
              value={values.plate}
              onChange={handleChange}
            />
            {errors.plate && (
              <span style={{ color: "red" }}>{errors.plate}</span>
            )}
          </FormField>

          <FormField>
            <Label htmlFor="technicianName">
              Técnico <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              id="technicianName"
              name="technicianName"
              type="text"
              required
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
              type="datetime-local"
              required
              value={values.date}
              onChange={handleChange}
            />
            {errors.date && <span style={{ color: "red" }}>{errors.date}</span>}
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
            <InputFile
              id="installationPhoto"
              name="installationPhoto"
              type="file"
              onChange={handleFileChange}
            />
            {errors.File && <span style={{ color: "red" }}>{errors.File}</span>}
          </FormField>

          <SubmitButton type="submit">Enviar</SubmitButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
}
