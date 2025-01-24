import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";

export default function DeleteCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <div>
          <NavLink to="/delete-vehicle">
            <Card title={"Vehículo"} subtitle={"Elimina un Vehículo"}>
              <MdOutlineDeleteSweep
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>

        <div>
          <NavLink to="/delete-installation">
            <Card title={"Instalación"} subtitle={"Elimina una Instalación"}>
              <MdOutlineDeleteOutline 
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>
      </ResponsiveContainerCard>
    </>
  );
}
