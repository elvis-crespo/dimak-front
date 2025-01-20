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
import axios from "axios";

export default function DeleteVehicle() {
  const { values, handleChange, resetForm } = useForm({
    plate: "",
  });

  const isChanged = values.plate.trim() !== "";

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 

    // Confirmación de SweetAlert
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `¡No podrás revertir esta acción!<br />Se eliminará el vehículo con placa <b>${values.plate}</b>.`,
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
        console.log("resultado ", response);

        if (response.message === "Vehículo eliminado correctamente") {
          // Si la respuesta es exitosa, mostramos un SweetAlert de éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: `Vehículo con placa ${values.plate} ha sido eliminado.`,
            icon: "success",
          });

          // Restablece el formulario después de mostrar el alert
          resetForm();
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
      const response = await axios.delete(
        `https://localhost:7131/api/v1/vehicle/delete?plateVehicle=${values.plate}`,
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

      console.error("Error deleting vehicle:", error);

      return error.response.data;
    }
  };

  return (
    <Container>
      <FormContainer style={{ margin: "30px 0" }}>
        <Title>Eliminar un Vehículo</Title>
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
          <SubmitButton type="submit" disabled={!isChanged}>
            Eliminar
          </SubmitButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
}
