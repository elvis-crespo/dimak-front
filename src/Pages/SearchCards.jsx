import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { LuFileSearch } from "react-icons/lu";


export default function SearchCards() {
  return (
    <>
      <ResponsiveContainerCard >
        <div>
          <NavLink to="/search-plate">
            <Card title={"Vehiculo"} subtitle={"Buscar por Placa"}>
              <LuFileSearch
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>

        <div>
          <NavLink to="/search-owner">
            <Card title={"vehiculo"} subtitle={"Buscar por Propietario"}>
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
