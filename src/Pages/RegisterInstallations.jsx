import axios from "axios";
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

export default function RegisterInstallations ()  {

    const { values, handleChange, resetForm } = useForm({
      plate: "",
      technicianName: "",
      date: "",
      installationCompleted: "",
    });

    console.log("values", values);



    const handleFormSubmit = async (data) => {
     
      const { year, ...rest } = data; // Extraemos el año si necesitas validarlo por separado

      const validatedYear = isNaN(parseInt(year)) ? 0 : parseInt(year); // Validación del año

      // Crear un objeto FormData
      const formData = new FormData();
      formData.append("Plate", rest.plate);
      formData.append("OwnerName", rest.ownerName);
      formData.append("Brand", rest.brand);
      formData.append("Model", rest.model);
      formData.append("Year", validatedYear);
      formData.append("Chassis", rest.chassis);
      formData.append("TechnicianName", rest.technicianName);
      formData.append("Date", rest.date);
      formData.append("InstallationCompleted", rest.installationCompleted);

      // const file = values.installationPhoto; // Define the file variable

      try {
        const response = await axios.post(
          "https://localhost:7131/api/v1/vehicle/registerv2", // URL del endpoint
          formData, // Enviar el FormData
          {
            headers: {
              "Content-Type": "multipart/form-data", // Encabezado para multipart/form-data
            },
          }
        );

        console.log(response.data);

        resetForm(); // Resetea el formulario después de enviar
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
      {/* <Sidebar /> */}

      <Container id="register">
        <FormContainer style={{ margin: "30px 0" }}>
          <Title>Instalaciones de Vehículo</Title>
          <StyledForm onSubmit={handleFormSubmit}>
            <SectionTitle>Installation Details</SectionTitle>

            <FormField>
              <Label htmlFor="plate">
                Placa <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="plate"
                name="plate"
                type="text"
                placeholder={""}
                required={true}
                value={values.technicianName}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="technicianName">
                Tecnico <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="technicianName"
                name="technicianName"
                type="text"
                placeholder={""}
                required={true}
                value={values.technicianName}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="date">
                Fecha <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                id="date"
                name="date"
                type="datetime-local"
                placeholder={""}
                required={true}
                value={values.date}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="installationCompleted">
                Instalacion Completada
              </Label>
              <TextArea
                id="installationCompleted"
                name="installationCompleted"
                type="placeholder"
                placeholder={"Escribe una descripción"}
                required={false}
                value={values.installationCompleted}
                onChange={handleChange}
              />
            </FormField>

            <FormField>
              <Label htmlFor="installationPhoto">Foto de Instalacion</Label>
              <InputFile
                id="installationPhoto"
                name="installationPhoto"
                type="file"
                placeholder={""}
                required={false}
                value={values.installationPhoto}
                onChange={handleChange}
              />
            </FormField>

            <SubmitButton type="submit">Enviar</SubmitButton>
          </StyledForm>
        </FormContainer>
      </Container>
      </>
  );
}
