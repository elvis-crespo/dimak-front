import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { CgFolderAdd } from "react-icons/cg";
import { TiDocumentAdd } from "react-icons/ti";

export default function RegisterCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <div>
          <NavLink to="/register-vehicle">
            <Card title={"Vehiculo"} subtitle={"Registrar Vehiculo"}>
              <CgFolderAdd style={{ fontSize: "4em", paddingBottom: "10px" }} />
            </Card>
          </NavLink>
        </div>

        <div>
          <NavLink to="/register-installation">
            <Card title={"Instalación"} subtitle={"Registrar Instalación"}>
              <TiDocumentAdd
                style={{ fontSize: "4em", paddingBottom: "10px" }}
              />
            </Card>
          </NavLink>
        </div>
      </ResponsiveContainerCard>
    </>
  );
}
