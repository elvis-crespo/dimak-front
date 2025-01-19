import { Container } from "../components/CustomFormStyled";
import { CustomerTable } from "../components/CustomTable";
import axios from "axios";
import { useState } from "react";
import { SearchInput } from "../components/SearchInput";

export default function SearchOwner() {
  const columnsHeader = ["Placa", "Dueño", "Marca", "Modelo", "Año"];
  const columnKeys = ["plate", "ownerName", "brand", "model", "year"];

  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(inputValue);
    try {
      const response = await axios.get(
        `https://localhost:7131/api/v1/vehicle/vehicles/owner/${inputValue}`
      );
      const transform = [response.data.data];
      setData(transform);
      console.log("mis datos ", data);
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
          text={"Nombre del Propietario"}
        />
        <CustomerTable
          data={data}
          columnsHeader={columnsHeader}
          columnKeys={columnKeys}
        />
      </Container>
    </>
  );
}
