import styled from "styled-components";
import {
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  Title,
} from "../components/CustomFormStyled";
import { Logo } from "../assets/images/Logo";
import Button from "../components/Button";
import { useState } from "react";
import { loginUser } from "../redux/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-image: url("/assets/images/image-login.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px 20px;
  transition: all 0.5s ease-in-out;

  a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  /* Ajustes responsivos opcionales */
  @media (max-width: 768px) {
    background-image: url("/assets/images/image-login-mobile.webp");
  }
`;

const Container = styled(FormContainer)`
  //   background: rgba(254, 254, 254, 0.14);
  //   border-radius: 16px;
  //   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  //   backdrop-filter: blur(11.5px);
  //   -webkit-backdrop-filter: blur(11.5px);
  //   border: 1px solid rgba(254, 254, 254, 0.16);
  /* From https://css.glass */
  /* From https://css.glass */
  //   background: rgba(0, 0, 0, 0.35);
  //   border-radius: 16px;
  //   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  //   backdrop-filter: blur(11.5px);
  //   -webkit-backdrop-filter: blur(11.5px);
  //   border: 1px solid rgba(0, 0, 0, 0.16);

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.16);

  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.16);

//   /* From https://css.glass */
//   background: rgba(255, 255, 255, 0.12);
//   border-radius: 16px;
//   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
//   backdrop-filter: blur(14.1px);
//   -webkit-backdrop-filter: blur(14.1px);
//   border: 1px solid rgba(255, 255, 255, 0.26);

//   /* From https://css.glass */
//   background: rgba(0, 0, 0, 0.41);
//   border-radius: 16px;
//   box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
//   backdrop-filter: blur(9px);
//   -webkit-backdrop-filter: blur(9px);
//   border: 1px solid rgba(0, 0, 0, 0.26);
`;

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    navigate("/home");
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    let userCred = {
      userName,
      password,
    };
    
    dispatch(loginUser(userCred)).then((result) => {
      if (result.payload) {
        console.log(result.payload);
        setUserName("");
        setPassword("");
        navigate("/home");
      }
    });


    
  };

  // Obtener el token y decodificarlo
  // useEffect(() => {
  //   const token = sessionStorage.getItem("idToken");
  //   if (token) {
  //     const userInfo = jwtDecode(token);
  //     setUserInf(userInfo);
  //     console.log("userInfo", userInfo);
  //   }
  // }, []);

  return (
    <>
      <LoginContainer>
        <Container as={"form"} onSubmit={handleLogin}>
          <Title style={{ marginBottom: "0", textTransform: "uppercase" }}>
            Inicio de Sesión
          </Title>
          <Logo />
          <SectionTitle style={{ textAlign: "center" }}>
            Sistema Integral de Instalaciones Vehiculares
          </SectionTitle>
          <FormField style={{ marginTop: "1.5rem" }}>
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="Usuario"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormField>
          <FormField style={{ marginTop: "1.5rem" }}>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button text="Iniciar Sesión" type="submit" />
          </div>
        </Container>
      </LoginContainer>
    </>
  );
}
