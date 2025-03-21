/* eslint-disable no-unused-vars */
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
import { useForm } from "../Hooks/useForm";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainer } from "../components/Animations";
import { BiSearchAlt } from "react-icons/bi";
import { useState } from "react";

export default function UpdateVehicle() {
  const { values, handleChange, resetForm, setValues } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(
        `/vehicle/search-plate?plate=${values.plate}`
      );

      if (response.data.isSuccess) {
        const vehicleData = response.data.data;

        // Actualizamos los valores correctamente
        setValues({
          ...values,
          ownerName: vehicleData.ownerName,
          brand: vehicleData.brand,
          model: vehicleData.model,
          year: vehicleData.year,
        });

        setIsEditing(true);
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message || "No se encontraron datos para esa placa.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al buscar el vehículo:", error);
      Swal.fire({
        title: "Error",
        text: `${error.response?.data?.message || "Hubo un problema al buscar el vehículo."}`,
        icon: "error",
      });
    }
  };

  const handleFormSubmit = async (e) => {
      e.preventDefault(); // Prevenir el envío del formulario al presionar Enter
    

    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: "No guardar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        if (response.isSuccess) {
          Swal.fire({
            title: "¡Actualizado!",
            text: `Vehículo con placa ${values.plate} ha sido actualizado.`,
            icon: "success",
          });

          resetForm();
          setIsEditing(false); // Deshabilita edición después de actualizar
        } else {
          Swal.fire({
            title: "Error",
            text:
              response.message || "Hubo un problema al actualizar el vehículo.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleFetch = async () => {
    try {
      const response = await axiosInstance.put(
        `/vehicle/update?plate=${values.plate}`,
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Hubo un problema al conectar con el servidor.",
      });

      return error.response?.data || { isSuccess: false };
    }
  };

  return (
    <Container>
      <AnimatedContainer>
        <FormContainer>
          <Title>Actualizar Información de Vehículo</Title>
          <StyledForm onSubmit={handleFormSubmit}>
            <SectionTitle>Detalles del Vehículo</SectionTitle>

            {/* Input de placa con botón de búsqueda */}
            <FormField>
              <Label htmlFor="plate">
                Placa <span style={{ color: "red" }}>*</span>
              </Label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Input
                  style={{ width: "95%" }}
                  id="plate"
                  name="plate"
                  type="text"
                  autoComplete="off"
                  placeholder="Ej. AAA-1234 o AA-123A"
                  required
                  value={values.plate}
                  onChange={handleChange}
                />
                <BiSearchAlt
                  onClick={handleSearch}
                  style={{ cursor: "pointer", fontSize: "1.5em" }}
                />
              </div>
            </FormField>

            {/* Inputs que solo se habilitan después de la búsqueda */}
            {isEditing && (
              <>
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    width: "100%",
                    margin: "1rem 0",
                  }}
                />
                <FormField>
                  <Label htmlFor="ownerName">
                    Nombre del Cliente <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    autoComplete="off"
                    required
                    value={values.ownerName}
                    onChange={handleChange}
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    name="brand"
                    type="text"
                    autoComplete="off"
                    value={values.brand}
                    onChange={handleChange}
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="model">Modelo</Label>
                  <Input
                    id="model"
                    name="model"
                    type="text"
                    autoComplete="off"
                    value={values.model}
                    onChange={handleChange}
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    autoComplete="off"
                    placeholder="2025"
                    value={values.year}
                    onChange={handleChange}
                    onWheel={(e) => e.target.blur()}
                  />
                </FormField>

                <SubmitButton type="button" >Actualizar</SubmitButton>
              </>
            )}
          </StyledForm>
        </FormContainer>
      </AnimatedContainer>
    </Container>
  );
}
