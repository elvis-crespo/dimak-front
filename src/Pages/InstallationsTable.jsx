//localhost:7131/api/v1/installation/show?plate=1234
// https: import { useState } from "react";
// import { Container } from "../components/CustomFormStyled";
// import { CustomerTable } from "../components/CustomTable";
// import { SearchInput } from "../components/SearchInput";
// import axios from "axios";

// export default function InstallationsTable() {
//   const columnsHeader = [
//     "Placa",
//     "Detalles de la Instalación",
//     "Tecnico",
//     "Fecha",
//     "Foto",
//   ];
//   const columnKeys = [
//     "plateId",
//     "installationCompleted",
//     "technicianName",
//     "date",
//     "photoUrl",
//   ];

//   const [inputValue, setInputValue] = useState("");
//   const [data, setData] = useState([]);
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     console.log("sd", inputValue);

//     try {
//       const response = await axios.get(
//         `https://localhost:7131/api/v1/installation/${inputValue}/?pageSize=5`
//       );
//       setData(response.data.installationRecords);
//       console.log("mis datos ", response.data.installationRecords);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <>
//       <Container style={{ justifyContent: "flex-start" }}>
//         <SearchInput
//           handleSubmit={handleSubmit}
//           inputValue={inputValue}
//           setInputValue={setInputValue}
//           text={"Placa AAA-1234"}
//         />
//         <CustomerTable
//           data={data}
//           columnsHeader={columnsHeader}
//           columnKeys={columnKeys}
//         />
//       </Container>
//     </>
//   );
// }


import { Container, Title } from "../components/CustomFormStyled";
import { CustomerTable } from "../components/CustomTable";
import axios from "axios";
import { useState } from "react";
import { SearchInput } from "../components/SearchInput";
import { API_BASE_URL } from "../utils/config";
import Swal from "sweetalert2";

export default function SearchPlate() {
  const columnsHeader = [
    "Placa",
    "Detalles de la Instalación",
    "Tecnico",
    "Fecha",
    "Foto",
  ];
  const columnKeys = [
    "plateId",
    "installationCompleted",
    "technicianName",
    "date",
    "photoUrl",
  ];

  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await handleFetch();

    if (response.isSuccess === true) {
      const transform = response.installationRecords;
      setData(transform);
      console.log("mis datos 00", response.installationRecords);
    }
  };
  //localhost:7131/api/v1/installation/show?plate=1234

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/installation/show?plate=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("mis datos ", response.data.installationRecords);
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
          text={"Placa AAA-1234"}
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
