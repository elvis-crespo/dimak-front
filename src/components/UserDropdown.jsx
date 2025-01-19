import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { themeTypography } from "../utils/themes";

// Contenedor principal del dropdown
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Contenedor que muestra el nombre del usuario y la flecha
const UserDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: white;
`;

// Nombre del usuario
const UserName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  font-family: ${themeTypography.fontFamily};
`;

// Flecha para indicar el estado del menú
const Arrow = styled.span`
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  color: ${({ theme }) => theme.text};
`;

// Contenedor del menú desplegable
const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  z-index: 10;
  min-width: 200px;
`;

// Elementos individuales del menú
const DropdownItem = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #000;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-family: ${themeTypography.fontFamily};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// Estilo especial para el botón de cerrar sesión
const DropdownItemLogout = styled(DropdownItem)`
  color: red;

  &:hover {
    background-color: #ffe6e6;
  }
`;

const UserDropdown = ({ userInf, handleClickLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <UserDisplay onClick={toggleDropdown}>
        <UserName>{userInf?.given_name}</UserName>
        <Arrow isOpen={isOpen}>▼</Arrow>
      </UserDisplay>

      {isOpen && (
        <DropdownMenu>
          <DropdownItem href="/change-password">change password</DropdownItem>
          <DropdownItem href="/help-center">help center</DropdownItem>
          <DropdownItemLogout onClick={handleClickLogout}>
            Logout
          </DropdownItemLogout>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};
UserDropdown.propTypes = {
  userInf: PropTypes.shape({
    given_name: PropTypes.string,
  }),
  handleClickLogout: PropTypes.func.isRequired,
};

export default UserDropdown;
