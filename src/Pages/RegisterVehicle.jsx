import {
  Container,
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  Select,
  StyledForm,
  SubmitButton,
  TextArea,
  Title,
} from "../components/CustomFormStyled";
import { useEffect, useState } from "react";
import { useForm } from "../Hooks/useForm";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
import { AnimatedContainerSlight } from "../components/Animations";
import { carBrands, motorcycleBrands } from "../utils/brands";
import { validateFields } from "../utils/validateFields.js";
import ImageUploader from "../components/ImageUploader.jsx";

export default function RegisterVehicle() {
  const [errors, setErrors] = useState({});
  const [customBrand, setCustomBrand] = useState("");
  const [isCustomBrandSelected, setIsCustomBrandSelected] = useState(false);

  const { values, handleChange, resetForm } = useForm({
    plate: "",
    ownerName: "",
    brand: "",
    model: "",
    year: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null, // Campo para el archivo
  });

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (/^[A-Z]{3}-\d{4}$/.test(values.plate)) {
      setFilteredBrands(carBrands);
    } else if (/^[A-Z]{2}-\d{3}[A-Z]$/.test(values.plate)) {
      setFilteredBrands(motorcycleBrands);
    } else {
      setFilteredBrands([]);
    }
  }, [values.plate]);

  // Función para manejar la imagen subida
  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };

  // Manejo del cambio de la marca
  const handleBrandChange = (e) => {
    const value = e.target.value;
    handleChange(e);

    if (value === "Otros") {
      setIsCustomBrandSelected(true);
      setCustomBrand(""); // Limpiar el campo cuando se elige "otros"
    } else {
      setIsCustomBrandSelected(false);
      setCustomBrand(""); // También limpiamos en caso de volver a una opción normal
    }
  };

  // Manejo del cambio del campo personalizado
  const handleCustomBrandChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCustomBrand(value);
  };

  //  Validaciones para el formulario
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
    formData.append("photoUrl", values.photoUrl); // Archivo
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photoUrl") formData.append(key, value);
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

      // Mover el scroll al inicio después de cerrar el Swal
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200); // Ajusta el tiempo de delay si es necesario
    });
  };

  // Función para limpiar el formulario
  const resetFormAndFile = () => {
    resetForm(); // Resetea los valores controlados por el hook
    setImage(null); // Limpia la imagen de la vista previa
    values.photoUrl = null; // Limpia el valor del archivo
    setCustomBrand("");
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
    setErrors({});
  };

  // Función para enviar el formulario
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

  return (
    <>
      <Container id="register">
        <AnimatedContainerSlight>
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
                  autoComplete="off"
                  placeholder={"Ej. AAA-1234 o AA-123A."}
                  required={true}
                  value={values.plate}
                  onChange={handleChange}
                  $hasError={!!errors.plate}
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
                  autoComplete="off"
                  required={true}
                  value={values.ownerName}
                  onChange={handleChange}
                  $hasError={!!errors.ownerName}
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
                  $hasError={!!errors.brand}
                >
                  <option value="" disabled>
                    Selecciona una marca
                  </option>
                  {filteredBrands.map((brand) => (
                    <option key={brand.value} value={brand.label}>
                      {brand.label}
                    </option>
                  ))}
                </Select>
                {errors.brand && (
                  <span style={{ color: "red" }}>{errors.brand}</span>
                )}
              </FormField>

              {isCustomBrandSelected && (
                <FormField>
                  <Label htmlFor="customBrand">Marca Personalizada</Label>
                  <Input
                    id="customBrand"
                    name="customBrand"
                    type="text"
                    autoComplete="off"
                    value={customBrand}
                    onChange={handleCustomBrandChange}
                    $hasError={!!errors.brand}
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
                  autoComplete="off"
                  value={values.model}
                  onChange={handleChange}
                  $hasError={!!errors.model}
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
                  autoComplete="off"
                  placeholder={"2025"}
                  value={values.year}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                  $hasError={!!errors.year}
                />
                {errors.year && (
                  <span style={{ color: "red" }}>{errors.year}</span>
                )}
              </FormField>

              <SectionTitle style={{ marginTop: "30px" }}>
                Detalles de la Instalación
              </SectionTitle>

              <FormField>
                <Label htmlFor="technicalFileNumber">
                  Nº de Ficha Técnica <span style={{ color: "red" }}>*</span>
                </Label>
                <Input
                  id="technicalFileNumber"
                  name="technicalFileNumber"
                  type="text"
                  placeholder={"Solo números"}
                  autoComplete="off"
                  required={true}
                  value={values.technicalFileNumber}
                  onChange={handleChange}
                  $hasError={!!errors.technicalFileNumber}
                />
                {errors.technicalFileNumber && (
                  <span style={{ color: "red" }}>
                    {errors.technicalFileNumber}
                  </span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="invoiceNumber">Nº de Factura</Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  autoComplete="off"
                  placeholder={"Ej. 001-001-123456789"}
                  value={values.invoiceNumber}
                  onChange={handleChange}
                  $hasError={!!errors.invoiceNumber}
                />
                {errors.invoiceNumber && (
                  <span style={{ color: "red" }}>{errors.invoiceNumber}</span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="technicianName">Técnico</Label>
                <Input
                  id="technicianName"
                  name="technicianName"
                  type="text"
                  autoComplete="off"
                  value={values.technicianName}
                  onChange={handleChange}
                  $hasError={!!errors.technicianName}
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
                  autoComplete="off"
                  required={true}
                  value={values.date ? values.date.split("T")[0] : ""}
                  // value={values.date}
                  onChange={handleChange}
                  $hasError={!!errors.date}
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
                  autoComplete="off"
                  placeholder={"Escribe una descripción"}
                  value={values.installationCompleted}
                  onChange={handleChange}
                  $hasError={!!errors.installationCompleted}
                />
                {errors.installationCompleted && (
                  <span style={{ color: "red" }}>
                    {errors.installationCompleted}
                  </span>
                )}
              </FormField>

              <FormField>
                <Label htmlFor="installationPhoto">Foto de Instalación</Label>
                <ImageUploader
                  onFileChange={handleFileChange}
                  image={image}
                  title="Cargar Foto"
                  id="installationPhoto"
                />
                {errors.photoUrl && (
                  <span style={{ color: "red" }}>{errors.photoUrl}</span>
                )}
              </FormField>

              <SubmitButton type="submit">Enviar</SubmitButton>
              <SubmitButton type="reset" onClick={resetForm}>
                Limpiar
              </SubmitButton>
            </StyledForm>
          </FormContainer>
        </AnimatedContainerSlight>
      </Container>
    </>
  );
}
