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

export default function RegisterUpdate() {
  const menuItems = [
    { path: "/register", label: "Registrar" },
    { path: "/resgister-installations", label: "Registrar instalación" },
    { path: "/search", label: "Consultar" },
    { path: "/instllationsRecords", label: "Historial de instalaciones" },
    { path: "/update", label: "Actualizar" },
    { path: "/delete", label: "Eliminar" },
  ];

  const { values, handleChange, resetForm } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Confirmación de SweetAlert
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonAriaLabel: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        if (response.isSuccess === true) {
          // Si la respuesta es exitosa, mostramos un SweetAlert de éxito
          Swal.fire({
            title: "¡Actualizado!",
            text: `Vehículo con placa ${values.plate} ha sido actualizado.`,
            icon: "success",
          });

          // Restablece el formulario después de mostrar el alert
          resetForm();
        } else {
          // Si la respuesta es un error, mostramos un SweetAlert con el mensaje de error
          Swal.fire({
            title: "Error",
            text:
              // response.message || "Hubo un problema al eliminar el vehículo.",
              response.message || "Hubo un problema al eliminar el vehículo.",
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
        {
          headers: {
            "Content-Type": "application/json",
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
    <>
      <Container>
        <AnimatedContainer>
          <FormContainer>
            <Title>Actualizar datos de Vehículo</Title>
            <StyledForm onSubmit={handleFormSubmit}>
              <SectionTitle>Detalles del Vehículo</SectionTitle>
              <FormField>
                <Label htmlFor="plate">
                  Placa <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  id="plate"
                  name="plate"
                  type="text"
                  placeholder={"AAA-1234"}
                  required={true}
                  value={values.plate}
                  onChange={handleChange}
                />
              </FormField>

              <FormField>
                <Label htmlFor="ownerName">
                  Nombre del Cliente <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  placeholder={""}
                  required={true}
                  value={values.ownerName}
                  onChange={handleChange}
                />
              </FormField>

              <FormField>
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  name="brand"
                  type="select"
                  placeholder={""}
                  required={false}
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
                  placeholder={""}
                  required={false}
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
                  placeholder={"2025"}
                  required={false}
                  value={values.year}
                  onChange={handleChange}
                />
              </FormField>

              <SubmitButton type="submit">Enviar</SubmitButton>
            </StyledForm>
          </FormContainer>
        </AnimatedContainer>
      </Container>
    </>
  );
}
