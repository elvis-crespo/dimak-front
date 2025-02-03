import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";
import { ResponsiveContainerCard } from "../components/CustomFormStyled";
import { LuFileSearch } from "react-icons/lu";
import { AnimatedContainer } from "../components/Animations";

export default function SearchCards() {
  return (
    <>
      <ResponsiveContainerCard>
        <AnimatedContainer>
          <div>
            <NavLink to="/search-plate">
              <Card title={"Vehículo"} subtitle={"Buscar por Placa"}>
                <LuFileSearch
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>

        <AnimatedContainer>
          <div>
            <NavLink to="/instllationsRecords">
              <Card
                title={"Instalación"}
                subtitle={"Buscar por Número de Factura"}
              >
                <LuFileSearch
                  style={{ fontSize: "4em", paddingBottom: "10px" }}
                />
              </Card>
            </NavLink>
          </div>
        </AnimatedContainer>
      </ResponsiveContainerCard>
    </>
  );
}
