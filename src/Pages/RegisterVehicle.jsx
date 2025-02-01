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
import styled from "styled-components";
import Swal from "sweetalert2";
import { validateFields } from "../utils/validateFields";
import axiosInstance from "../utils/axiosInstance";

const Layout = styled.div`
  display: flex;
  overflow-x: hidden;
`;

export default function RegisterVehicle() {
 const carBrands = [
   { label: "Chevrolet", value: "chevrolet" },
   { label: "Kia", value: "kia" },
   { label: "Toyota", value: "toyota" },
   { label: "Hyundai", value: "hyundai" },
   { label: "Chery", value: "chery" },
   { label: "Suzuki", value: "suzuki" },
   { label: "Renault", value: "renault" },
   { label: "GWM", value: "gwm" },
   { label: "JAC", value: "jac" },
   { label: "DFSK", value: "dfsk" },
   { label: "Volkswagen", value: "volkswagen" },
   { label: "Nissan", value: "nissan" },
   { label: "Hino", value: "hino" },
   { label: "Mazda", value: "mazda" },
   { label: "Shineray", value: "shineray" },
   { label: "Dongfeng", value: "dongfeng" },
   { label: "Sinotruk", value: "sinotruk" },
   { label: "Jetour", value: "jetour" },
   { label: "Ford", value: "ford" },
   { label: "Changan", value: "changan" },
   { label: "BMW", value: "bmw" },
   { label: "Mercedes-Benz", value: "mercedes_benz" },
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
   { label: "Fiat", value: "fiat" },
   { label: "Land Rover", value: "land_rover" },
   { label: "BYD", value: "byd" },
   { label: "Subaru", value: "subaru" },
   { label: "Citroën", value: "citroen" },
 ];


  const [errors, setErrors] = useState({});
  const [customBrand, setCustomBrand] = useState("");
  const [isCustomBrandSelected, setIsCustomBrandSelected] = useState(false);

  const { values, handleChange, resetForm } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
    invoiceNumber: "",
    technicalFileNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    PhotoUrl: null, // Campo para el archivo
  });

  // Manejo del cambio del archivo
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]; // Validar archivo

    if (!file) {
      return;
    }

    values.PhotoUrl = file; // Guardar el archivo en los valores del formulario
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    handleChange(e);

    if (value === "others") {
      setIsCustomBrandSelected(true);
      setCustomBrand(""); // Limpiar el campo cuando se elige "otros"
    } else {
      setIsCustomBrandSelected(false);
      setCustomBrand(""); // También limpiamos en caso de volver a una opción normal
    }
  };

  const handleCustomBrandChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCustomBrand(value);
  };

  const validateForm = () => {
    const newErrors = {};

    const selectedBrand = carBrands.find(
      (brand) => brand.value === values.brand
    );
    values.brand = isCustomBrandSelected
      ? customBrand
      : selectedBrand?.label || values.brand;

    Object.keys(values).forEach((field) => {
      const error = validateFields[field](values[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

console.log(values);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();

    // Agregar los valores al FormData
    formData.append("PhotoUrl", values.PhotoUrl); // Archivo
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "PhotoUrl") formData.append(key, value);
    });

    Swal.fire({
      title: "¿Deseas Guardar esta Instalación?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonText: "Cancelar",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await HandleFetch(formData);

        if (response.isSuccess === true) {
          Swal.fire({
            title: "¡Guardado!",
            text: `Vehículo con placa ${values.plate} ha sido guardado.`,
            icon: "success",
          });
          resetFormAndFile();
        }
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  const HandleFetch = async (formData) => {
    const url = `/vehicle/register`;

    try {
      // Enviar solicitud con Axios
      const response = await axiosInstance.post(url, formData, {
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

      return error.response?.data; // Retornar el error desde el servidor si existe
    }
  };

  const resetFormAndFile = () => {
     resetForm(); // Resetea los valores controlados por el hook
     values.PhotoUrl = null; // Limpia el valor del archivo
     setCustomBrand("");
     const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
     if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
     setErrors({});
  };

  return (
    <>
      <Layout>
        <Container id="register">
          <FormContainer>
            <Title>Registro de Vehículo</Title>
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
                  placeholder={"Ej. AAA-1234"}
                  required={true}
                  value={values.plate}
                  onChange={handleChange}
                />
                {errors.plate && (
                  <span style={{ color: "red" }}>{errors.plate}</span>
                )}
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
                {errors.ownerName && (
                  <span style={{ color: "red" }}>{errors.ownerName}</span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="brand">Marca</Label>
                <Select
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={handleBrandChange}
                >
                  <option value="" disabled>
                    Selecciona una marca
                  </option>
                  {carBrands.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                  <option value="others">Otros</option>
                </Select>
              </FormField>

              {isCustomBrandSelected && (
                <FormField>
                  <Label htmlFor="customBrand">Marca Personalizada</Label>
                  <Input
                    id="customBrand"
                    name="customBrand"
                    type="text"
                    value={customBrand}
                    onChange={handleCustomBrandChange}
                  />
                  {errors.brand && (
                    <span style={{ color: "red" }}>{errors.brand}</span>
                  )}
                </FormField>
              )}

              <FormField>
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  name="model"
                  type="text"
                  placeholder={""}
                  value={values.model}
                  onChange={handleChange}
                />
                {errors.model && (
                  <span style={{ color: "red" }}>{errors.model}</span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="year">Año</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  placeholder={"2025"}
                  value={values.year}
                  onChange={handleChange}
                />
                {errors.year && (
                  <span style={{ color: "red" }}>{errors.year}</span>
                )}
              </FormField>

              <SectionTitle style={{ marginTop: "30px" }}>
                Detalles de la Instalación
              </SectionTitle>

              <FormField>
                <Label htmlFor="invoiceNumber">
                  Nº de Factura <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  placeholder={"Ej. 001-001-123456789"}
                  required={true}
                  value={values.invoiceNumber}
                  onChange={handleChange}
                />
                {errors.invoiceNumber && (
                  <span style={{ color: "red" }}>{errors.invoiceNumber}</span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="technicalFileNumber">Nº de Ficha Técnica</Label>
                <Input
                  id="technicalFileNumber"
                  name="technicalFileNumber"
                  type="text"
                  placeholder={""}
                  required={false}
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
                <Label htmlFor="technicianName">
                  Técnico <span style={{ color: "red" }}>*</span>
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
                  placeholder={""}
                  required={true}
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
                  type="placeholder"
                  placeholder={"Escribe una descripción"}
                  required={false}
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
                  placeholder={""}
                  required={false}
                  onChange={handleFileChange}
                />
                {errors.PhotoUrl && (
                  <span style={{ color: "red" }}>{errors.PhotoUrl}</span>
                )}
              </FormField>

              <SubmitButton type="submit">Enviar</SubmitButton>
              <SubmitButton type="reset" onClick={resetForm}>
                Limpiar
              </SubmitButton>
            </StyledForm>
          </FormContainer>
        </Container>
      </Layout>
    </>
  );
}