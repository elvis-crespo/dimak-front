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
        <AnimatedContainer>
          {/* <Logo
            currentcolor={theme === "dark" ? "#000" : "#fff"}
            currentcolor2={theme === "dark" ? "#ff0000" : "#000"}
            currentwidth={"75vw"}
            currentheight={"75vh"}
          /> */}
          {/* <img
          style={{ width: "75vw", height: "75vh" }}
            src={theme === "dark" ? "/logo-light.svg" : "/logo-dark.svg"}
            alt="Logo"
          /> */}
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
