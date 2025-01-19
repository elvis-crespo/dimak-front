import { useState } from "react";
import { Container } from "../components/CustomFormStyled";
import { CustomerTable } from "../components/CustomTable";
import { SearchInput } from "../components/SearchInput";
import axios from "axios";

export default function InstallationsTable() {
  const columnsHeader = ["Placa", "Detalles de la Instalación", "Tecnico", "Fecha", "Foto"];
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

    console.log("sd",inputValue);

    try {
      const response = await axios.get(
        `https://localhost:7131/api/v1/installation/${inputValue}/?pageSize=5`
      );
      setData(response.data.installationRecords);
      console.log("mis datos ", response.data.installationRecords);
    } catch (error) {
      console.error(error);
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
        <CustomerTable data={data} columnsHeader={columnsHeader} columnKeys={columnKeys}/>
      </Container>
    </>
  );
}

