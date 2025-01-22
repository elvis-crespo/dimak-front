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
import Swal from "sweetalert2";
import { API_BASE_URL } from "../utils/config";
import { validateFields } from "../utils/validateFields.JS";

const Layout = styled.div`
  display: flex;
  overflow-x: hidden;
  // overflow-y: hidden;
  // @media (max-width: 920px) {
  //   min-height: 100vh;
  // }
`;

export default function RegisterVehicle() {
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
  ];

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

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});

  // Manejo del cambio del archivo
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]; // Validar archivo

    if (!file) {
      return;
    }

    values.PhotoUrl = file; // Guardar el archivo en los valores del formulario
  };

  const resetFormAndFile = () => {
    resetForm(); // Resetea los valores controlados por el hook
    values.PhotoUrl = null; // Limpia el valor del archivo
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
    setErrors({});
  };

  
  const [customBrand, setCustomBrand] = useState("");


  const handleCustomBrandChange = (e) => {
    e.preventDefault();
    setCustomBrand(e.target.value); 
  };


  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    values.brand = customBrand;
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
    const url = `${API_BASE_URL}/vehicle/register`;

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

      return error.response?.data; // Retornar el error desde el servidor si existe
    }
  };

  return (
    <>
      <Layout>
        <Container id="register">
          <FormContainer style={{ margin: "30px 0" }}>
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
                  value={values.brand || ""} // Asegura que tenga un valor inicial válido
                  onChange={(e) => {
                    handleChange(e); // Actualiza el estado
                  }}
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

              {values.brand === "others" && (
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
                  // required={false}
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
                  placeholder={""}
                  required={true}
                  value={values.date}
                  onChange={handleChange}
                />
                {errors.date && (
                  <span style={{ color: "red" }}>{errors.date}</span>
                )}
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
                {errors.installationCompleted && (
                  <span style={{ color: "red" }}>
                    {errors.installationCompleted}
                  </span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="installationPhoto">Foto de Instalacion</Label>
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