import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { LuFileSearch } from "react-icons/lu";


export default function DeleteCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <div>
          <NavLink to="/delete-vehicle">
            <Card title={"Vehículo"} subtitle={"Elimina un Vehículo"}>
              <LuFileSearch
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>

        <div>
          <NavLink to="/delete-installation">
            <Card title={"Instalación"} subtitle={"Elimina una Instalación"}>
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
