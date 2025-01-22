import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { LuFileSearch } from "react-icons/lu";


export default function SearchCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <div>
          <NavLink to="/search-plate">
            <Card title={"Vehículo"} subtitle={"Buscar por Placa"}>
              <LuFileSearch
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>

        <div>
          <NavLink to="/instllationsRecords">
            <Card title={"Instalación"} subtitle={"Busar por Número de Factura"}>
              <LuFileSearch
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>
      </ResponsiveContainerCard>
    </>
  );
}
