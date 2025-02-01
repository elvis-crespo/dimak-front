import { useSelector } from "react-redux";
import { Container, Title } from "../components/CustomFormStyled";
import { AnimatedContainer } from "../components/Animations";
import { LogoDark, LogoLight } from "../../public/Logo";

export default function Home() {
  const theme = useSelector((state) => state.theme.theme);

  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Container>
        <AnimatedContainer style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
          {theme === "dark" ? (
            <LogoDark currentWidth={"75vw"} currentHeight={"75vh"} />
          ) : (
            <LogoLight currentWidth={"75vw"} currentHeight={"75vh"} />
          )}

          {user && (
            <Title>
              Bienvenido de nuevo,{" "}
              {user?.[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
              ] || "Usuario"}
            </Title>
          )}
        </AnimatedContainer>
      </Container>
    </>
  );
}
