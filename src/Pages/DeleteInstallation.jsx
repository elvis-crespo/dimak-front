import Swal from "sweetalert2";
import {
  Container,
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  StyledForm,
  SubmitButton,
  Title,
} from "../components/CustomFormStyled";
import { useState } from "react";
import { validateFields } from "../utils/validateFields";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainer } from "../components/Animations";

export default function DeleteInstallation() {
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFields.invoiceNumber(inputValue.trim());
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    // Confirmación de SweetAlert
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `¡No podrás revertir esta acción!<br />Se eliminará el vehículo con placa <b>${inputValue}</b>.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        title: ".swal2-title",
        html: ".swal2-html-container",
        confirmButton: ".swal2-confirm",
        cancelButton: ".swal2-cancel",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.

        if (response.isSuccess === true) {
          // Si la respuesta es exitosa, mostramos un SweetAlert de éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: `Vehículo con placa ${inputValue} ha sido eliminado.`,
            icon: "success",
          });
          setInputValue("");
        } else {
          // Si la respuesta es un error, mostramos un SweetAlert con el mensaje de error
          Swal.fire({
            title: "Error",
            text:
              response.message || "Hubo un problema al eliminar el vehículo.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleFetch = async () => {
    try {
      const response = await axiosInstance.delete(
        `/installation/delete?invoiceNumber=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json", // Cambié a json porque no parece necesario multipart
          },
        }
      );
      return response.data; // Aquí espero que response.data contenga un campo `success` y `message` desde el backend.
    } catch (error) {
      // Verifica si el error es de red (servidor caído o no accesible)
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        // Error de conexión, el servidor no está disponible
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        // Otro tipo de error en la respuesta del servidor (sin respuesta)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        // Si hay una respuesta del servidor con un error (404, 500, etc.)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al eliminar el vehículo: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      return error.response.data;
    }
  };

  return (
    <Container>
      <AnimatedContainer>
        <FormContainer>
          <Title>Eliminar una Instalación</Title>
          <StyledForm onSubmit={handleFormSubmit}>
            <SectionTitle style={{ color: "#d70000" }}>
              Esta acción es irreversible y no se podrá recuperar el registro
              eliminado.
            </SectionTitle>
            <FormField>
              <Label htmlFor="plate">
                Nº de Factura <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="plate"
                name="plate"
                type="text"
                placeholder={"Ej. 001-001-123456789"}
                required={true}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </FormField>
            <SubmitButton
              type="submit"
              disabled={
                !inputValue.trim() || inputValue.trim() === lastSearchedValue
              }
            >
              Eliminar
            </SubmitButton>
          </StyledForm>
        </FormContainer>
      </AnimatedContainer>
    </Container>
  );
}
