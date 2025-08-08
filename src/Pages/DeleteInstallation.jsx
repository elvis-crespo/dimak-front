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
  Select,
} from "../components/CustomFormStyled";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainerSlight } from "../components/Animations";
import { validateFields } from "../utils/validateFields.js";

export default function DeleteInstallation() {
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [deleteType, setDeleteType] = useState("invoice"); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError =
    deleteType === "invoice"
      ? validateFields.invoiceNumber(inputValue.trim()) 
      : validateFields.technicalFileNumber(inputValue.trim()); 
  
  if (validationError) {
    Swal.fire({
      icon: "error",
      title: "Error de Validación",
      text: validationError,
    });
    return;
  }
  
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `¡No podrás revertir esta acción!<br />Se eliminará la instalación con ${
        deleteType === "invoice" ? "número de factura" : "expediente técnico"
      } <b>${inputValue}</b>.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        setLastSearchedValue(inputValue.trim());

        if (response.isSuccess) {
          Swal.fire({
            title: "¡Eliminado!",
            text: `Registro con ${
              deleteType === "invoice" ? "factura" : "expediente"
            } ${inputValue} ha sido eliminado.`,
            icon: "success",
          });
          setInputValue("");
        } else {
          Swal.fire({
            title: "Error",
            text: response.message || "Hubo un problema al eliminar el registro.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleFetch = async () => {
    const endpoint =
      deleteType === "invoice"
        ? `/installation/delete-by-invoice?invoiceNumber=${inputValue}`
        : `/installation/delete-by-technical-file?technicalFileNumber=${inputValue}`;

    try {
      const response = await axiosInstance.delete(endpoint, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al eliminar: ${error.response?.data?.message || error.message}`,
      });
      return error.response?.data || { isSuccess: false };
    }
  };

  return (
    <Container>
      <AnimatedContainerSlight>
        <FormContainer>
          <Title>Eliminar una Instalación</Title>
          <StyledForm onSubmit={handleFormSubmit}>
            <SectionTitle style={{ color: "#d70000" }}>
              Esta acción es irreversible y no se podrá recuperar el registro eliminado.
            </SectionTitle>

            <FormField>
              <Label htmlFor="deleteType">Eliminar por:</Label>
              <Select
                id="deleteType"
                value={deleteType}
                onChange={(e) => setDeleteType(e.target.value)}
              >
                <option value="invoice">Número de Factura</option>
                <option value="technicalFile">Expediente Técnico</option>
              </Select>
            </FormField>

            <FormField>
              <Label htmlFor="identifier">
                {deleteType === "invoice" ? "Nº de Factura" : "Expediente Técnico"}{" "}
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="identifier"
                type="text"
                autoComplete="off"
                placeholder={
                  deleteType === "invoice" ? "Ej. 001-001-123456789." : "Ej. Sólo números."
                }
                required={true}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </FormField>

            <SubmitButton
              type="submit"
              disabled={!inputValue.trim() || inputValue.trim() === lastSearchedValue}
            >
              Eliminar
            </SubmitButton>
          </StyledForm>
        </FormContainer>
      </AnimatedContainerSlight>
    </Container>
  );
}

