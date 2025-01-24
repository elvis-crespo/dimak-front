import { Container, Title } from "../components/CustomFormStyled";
import { CustomerTable } from "../components/CustomTable";
import axios from "axios";
import { useState } from "react";
import { SearchInput } from "../components/SearchInput";
import { API_BASE_URL } from "../utils/config";
import Swal from "sweetalert2";
 import { validateFields } from "../utils/validateFields.JS";

export default function SearchFactura() {
  const columnsHeader = [
    "Placa",
    "Nº de Factura",
    "Nº de ficha técnica",
    "Detalles de la Instalación",
    "Tecnico",
    "Fecha",
    "Foto",
  ];
  const columnKeys = [
    "plateId",
    "invoiceNumber",
    "technicalFileNumber",
    "installationCompleted",
    "technicianName",
    "date",
    "photoUrl",
  ];

  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.trim() === lastSearchedValue) return;

     // Validar la placa antes de enviar
        const validationError = validateFields.invoiceNumber(inputValue.trim());
        if (validationError) {
          Swal.fire({
            icon: "error",
            title: "Error de Validación",
            text: validationError,
          });
          return;
        }

    const response = await handleFetch();

    if (response.isSuccess === true) {
      const transform = [response.data];
      setData(transform);
      setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.
    }
  };
  
  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/installation/?invoiceNumber=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // Verifica si el error es de red (servidor caído o no accesible)
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        // Error de conexión, el servidor no está disponible
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else {
        // Si hay una respuesta del servidor con un error (404, 500, etc.)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.response.data?.message || error.message}`,
        });
      }

      return error.response.data;
    }
  };

  return (
    <>
      <Container style={{ justifyContent: "flex-start" }}>
        <SearchInput
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          text={"Ej. 001-001-123456789"}
          disabled={
            !inputValue.trim() || inputValue.trim() === lastSearchedValue
          }
        />
        {data && data.length > 0 && (
          <>
            <Title>Resultados de la busqueda:</Title>
            <CustomerTable
              data={data}
              columnsHeader={columnsHeader}
              columnKeys={columnKeys}
            />
          </>
        )}
      </Container>
    </>
  );
}
