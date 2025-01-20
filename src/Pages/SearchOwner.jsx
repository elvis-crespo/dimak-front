import { Container, Title } from "../components/CustomFormStyled";
import { CustomerTable } from "../components/CustomTable";
import axios from "axios";
import { useState } from "react";
import { SearchInput } from "../components/SearchInput";
import { API_BASE_URL } from "../utils/config";
import Swal from "sweetalert2";

export default function SearchOwner() {
  const columnsHeader = ["Placa", "Dueño", "Marca", "Modelo", "Año"];
  const columnKeys = ["plate", "ownerName", "brand", "model", "year"];

  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await handleFetch();

    if (response.isSuccess === true) {
      setData(response.data);
    }
  };
  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/vehicle/search-owner?ownerName=${inputValue}`,
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

      console.error("Error deleting vehicle:", error);

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
          text={"Propietario"}
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
