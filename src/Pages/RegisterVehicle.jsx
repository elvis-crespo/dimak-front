/* eslint-disable no-unused-vars */
import {
  Container,
  FormContainer,
  FormField,
  Input,
  InputFile,
  Label,
  SectionTitle,
  Select,
  StyledForm,
  SubmitButton,
  TextArea,
  Title,
} from "../components/CustomFormStyled";
import { useState } from "react";
import { useForm } from "../Hooks/useForm";
import axios from "axios";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  height: 100vh;
`;


export default function RegisterVehicle() {
  const [responseData, setResponseData] = useState(null);
  const [messageType, setMessageType] = useState("");

  // console.log("datos", responseData);
  // console.log("messageType", messageType);

  // const menuItems = [
  //   { path: "/register", label: "Registrar" },
  //   // { path: "/resgister-installations", label: "Registrar instalación" },
  //   { path: "/search", label: "Consultar" },
  //   // { path: "/instllationsRecords", label: "Historial de instalaciones" },
  //   { path: "/update", label: "Actualizar" },
  //   { path: "/delete", label: "Eliminar" },
  // ];

  const { values, handleChange, resetForm } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
    chassis: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
  });

  console.log("values", values);

  const carBrands = [
    { label: "Toyota", value: "toyota" },
    { label: "Honda", value: "honda" },
    { label: "Ford", value: "ford" },
    { label: "Chevrolet", value: "chevrolet" },
    { label: "Nissan", value: "nissan" },
    { label: "BMW", value: "bmw" },
    { label: "Mercedes-Benz", value: "mercedes_benz" },
    { label: "Volkswagen", value: "volkswagen" },
    { label: "Hyundai", value: "hyundai" },
    { label: "Kia", value: "kia" },
    { label: "Mazda", value: "mazda" },
    { label: "Subaru", value: "subaru" },
    { label: "Tesla", value: "tesla" },
    { label: "Audi", value: "audi" },
    { label: "Lexus", value: "lexus" },
    { label: "Jeep", value: "jeep" },
    { label: "Porsche", value: "porsche" },
    { label: "Volvo", value: "volvo" },
    { label: "Jaguar", value: "jaguar" },
    { label: "Ferrari", value: "ferrari" },
    { label: "Lamborghini", value: "lamborghini" },
    { label: "Mitsubishi", value: "mitsubishi" },
    { label: "Peugeot", value: "peugeot" },
    { label: "Renault", value: "renault" },
    { label: "Suzuki", value: "suzuki" },
    { label: "Fiat", value: "fiat" },
    { label: "Land Rover", value: "land_rover" },
    { label: "Otros", value: "others" },
  ];

  const handleFormSubmit = async (data) => {
    // const { year, ...rest } = data; // Si necesitas alguna manipulación adicional
    // if (isCustomBrand) data.brand = customBrand;
    // const validatedYear = isNaN(parseInt(year)) ? 0 : parseInt(year); // Validación de año
    // // const brand = data.brand === "other" ? data.customBrand : data.brand;

    // try {
    //   const response = await axios.post(
    //     "https://localhost:7131/api/v1/vehicle/register",
    //     { ...rest, year: validatedYear }
    //   );
    //   console.log(response.data);
    //   setResponseData(response.data);
    //   setMessageType("success");
    //   resetForm(); // Resetea el formulario después de enviar
    // } catch (error) {
    //   setResponseData(
    //     error.response?.data || { message: "Error al registrar el vehículo" }
    //   );
    //   setMessageType("error");
    // }
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

    const file = values.installationPhoto; // Define the file variable

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
      setResponseData(response.data);
      setMessageType("success");
      resetForm(); // Resetea el formulario después de enviar
    } catch (error) {
      setResponseData(
        error.response?.data || { message: "Error al registrar el vehículo" }
      );
      setMessageType("error");
    }
  };

  // const [isExpanded, setIsExpanded] = useState(true);

  // const toggleSidebar = () => {
  //   setIsExpanded((prev) => !prev);
  // };

  return (
    <>
      <Layout>
        {/* <div style={{ display: "flex" }}> */}
        {/* <Sidebar /> */}
        {/* 'https://localhost:7131/api/v1/installation/string?InstallationCompleted=sdf&TechnicianName=dfds&Date=2014-05-05' */}
        <Container id="register" style={{ minHeight: "min-content" }}>
          <FormContainer>
            <Title>Registro de Vehículo</Title>
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
                <Select
                  id="brand"
                  name="brand"
                  type="select"
                  placeholder={""}
                  required={false}
                  value={values.brand}
                  onChange={(e) => {
                    handleChange(e); // También actualiza el formulario
                  }}
                >
                  {carBrands.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </Select>
                {
                  <Input
                    type="text"
                    placeholder="Escriba su marca de vehículo"
                    // value={ customBrand}
                    // onChange={handleChange}
                    value={values.brand}
                    onChange={handleChange}
                  />
                }
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

              <SectionTitle style={{ marginTop: "30px" }}>
                Installation Details
              </SectionTitle>

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

          <NavLink to="/resgister-installations">
            <button onClick={handleFormSubmit} to="/register-installations">
              Añadir una Instalación
            </button>
          </NavLink>
          {/* values={values} 
          handleChange={handleChange} 
          onSubmit={handleFormSubmit}  */}
        </Container>
      </Layout>
    </>
  );
}
