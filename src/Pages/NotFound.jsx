import { NavLink } from "react-router-dom";
import styled from "styled-components"

const Img = styled.img`
  width: 100vw; 
  height: 100vh; 
  object-fit: contain; /* Asegura que la imagen cubra toda el área sin deformarse */
  object-position: center; 
`;



export default function NotFound() {
  return (
    <>
        <Img src="src/assets/images/Designer.jpeg" alt="not-found" />
        <NavLink to="/home">Go Home 🏠</NavLink>
    </>
  )
}
