// export default DropdownMenu;
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../redux/userReducer";
import { themeTypography } from "../utils/themes";
import { MdLogout } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { LiaUserSolid } from "react-icons/lia";
import { LiaUserCogSolid } from "react-icons/lia";
import { useNavigate } from "react-router";

const DropdownContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 25px;
  z-index: 1000;
  font-family: ${themeTypography.fontFamily};
`;

const ProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3f3f3f;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #575757;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  width: 250px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 18px;
  }

  &:hover {
    background-color:rgba(241, 241, 241, 0.51);
  }

  &:last-child {
    // border-top: 1px solid #ddd;
    margin-top: 10px;
    color: red;
    font-weight: bold;
    border-radius-top: 0;
    &:hover {
      background-color: rgb(255, 212, 212);
    }
  }
`;

// Componente funcional (sin cambios en lógica)
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    
    <DropdownContainer>
      {isLoggedIn ? (
        <ProfileButton onClick={toggleMenu} ref={toggleButtonRef}>
          {user?.name?.[0] || "A"} {/* Inicial del nombre */}
        </ProfileButton>
      ) : (
        <ProfileButton>?</ProfileButton>
      )}

      {isOpen && (
        <Menu ref={menuRef}>
          <MenuItem>
            <LiaUserSolid />
            {user?.[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ] || "Usuario"}
          </MenuItem>
          <MenuItem>
            <MdOutlineMail /> {user?.email || "Correo"}
          </MenuItem>
          <MenuItem>
            <LiaUserCogSolid />
            {user?.[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || "Rol"}
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <MdLogout />
            Cerrar sesión
          </MenuItem>
        </Menu>
      )}
    </DropdownContainer>
  );
};

export default DropdownMenu;
