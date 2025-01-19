/* eslint-disable no-unused-vars */
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

  const handleFormSubmit = async (data) => {
    console.log(data);
  };
  return (
    <>
      <Container>
        <FormContainer style={{ margin: "30px 0" }}>
          <Title>Actualizar datos de Vehículo</Title>
          <StyledForm onSubmit={handleFormSubmit}>
            <SectionTitle>Car Details</SectionTitle>
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
                Nombre del Dueño <span style={{ color: "red" }}>*</span>
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
      </Container>
    </>
  );
}
