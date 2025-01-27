import { useSelector } from "react-redux";
import { Logo } from "../assets/images/Logo";
import { Container } from "../components/CustomFormStyled";

export default function Home() {
  const theme = useSelector((state) => state.theme.theme); 
  return (
    <Container>
      <Logo
        currentColor={theme === "dark" ? "#000" : "#fff"}
        currentColor2={theme === "dark" ? "#ff0000" : "#000"}
        currentWidth={"75vw"}
        currentHeight={"75vh"}
      />
    </Container>
  );
}
