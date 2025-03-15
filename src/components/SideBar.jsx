/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaRegAddressBook } from "react-icons/fa";
import {
  MdArrowForwardIos,
  MdOutlineArrowBackIos,
  MdOutlineMenu,
} from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { themeTypography } from "../utils/themes";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DarkModeToggle, { Toggle } from "../utils/DarkModeToggle";
import { setSystemTheme, toggleTheme } from "../redux/themeReducer";
import { Logomin } from "../../public/Logomin";
import { LogoDark, LogoLight } from "../../public/Logo";

const SidebarContainer = styled.div`
  width: ${(props) => (props.$isExpanded ? "250px" : "80px")};
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: fixed;
  min-height: 100vh;
  font-family: ${themeTypography.fontFamily};
  background-color: ${({ theme }) => theme.sideBarBackground};
  z-index: 100;
  @media (max-width: 920px) {
    display: ${(props) => (props.$isVisible ? "flex" : "none")};
  }
  @media (max-width: 570px) {
    // flex-direction: column;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  transition: all 0.3s ease;
  background-color: ${({ theme }) => theme.hover};
  border-radius: 20px;
  height: 60px;
  margin: 20px 8px 48px 8px;

  svg {
    transition: all 0.3s ease;
    margin-top: 8px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const MenuItem = styled.li`
  background-color: ${(props) =>
    props.$isActive ? props.theme.hover : "transparent"};
  align-items: center;
  padding: 15px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 15px;
  display: flex;
  margin-bottom: 10px;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }

  a {
    text-decoration: none;
    color: #333;
    display: flex;
    align-items: center;

    svg {
      font-size: 20px;
      margin-right: ${(props) => (props.$isExpanded ? "15px" : "0")};
      transition: margin 0.3s ease;
      path {
        color: ${({ theme }) => theme.fill};
      }
    }

    span {
      display: ${(props) => (props.$isExpanded ? "inline" : "none")};
      font-weight: 600;
      font-family: ${themeTypography.fontFamily};
      transition: display 0.3s ease;
      color: ${({ theme }) => theme.fill};
    }
  }
`;

const SideBarOpen = styled.div`
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 999;
  @media (max-width: 920px) {
    display: block;
  }
  svg {
    font-size: 30px;
    color: ${({ theme }) => theme.text};
    width: 30px;
    height: 30px;
  }
`;

const Footer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// export const Sidebar = ({ theme, isAdmin }) => {
export const Sidebar = ({ theme }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = (e) => {
    setIsExpanded((prev) => !prev);
    e.preventDefault();
  };
  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((prev) => !prev);
  };
  const handleLogout = () => {
    setIsSidebarVisible(false);
  };
  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)
    ) {
      setIsExpanded(false);
      setIsSidebarVisible(false);
    }
  };

  const handleMenuItemClick = (path) => {
    navigate(path); // Redirige a la ruta deseada
  };

  useEffect(() => {
    setIsSidebarVisible(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Función para actualizar el tema basado en la preferencia del sistema
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      // Solo actualizamos el estado si el usuario no ha cambiado el tema manualmente
      if (localStorage.getItem("theme") !== newTheme) {
        dispatch(setSystemTheme(newTheme)); // Actualiza el tema en el estado global de Redux
      }
    };

    // Inicializa el tema al cargar la página
    // Este paso también lee desde localStorage, si el usuario ha hecho cambios manuales
    const initialTheme = localStorage.getItem("theme");
    if (initialTheme) {
      dispatch(setSystemTheme(initialTheme)); // Aplica el tema guardado en localStorage
    } else {
      handleSystemThemeChange(mediaQuery);
    }

    // Escucha los cambios del sistema
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Limpieza del efecto cuando el componente se desmonta
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [dispatch]);

  return (
    <>
      <SideBarOpen onClick={toggleSidebarVisibility}>
        {isSidebarVisible ? "" : <MdOutlineMenu />}
      </SideBarOpen>
      <SidebarContainer
        $isExpanded={isExpanded}
        ref={sidebarRef}
        $isVisible={isSidebarVisible}
      >
        <div>
          <LogoContainer>
            {isExpanded ? (
              theme === "dark" ? (
                <LogoDark
                  currentcolor={"#888888"}
                  currentCursor={"pointer"}
                  redirectTo={"/home"}
                />
              ) : (
                <LogoLight
                  currentcolor={"#ff5757"}
                  currentcolor2={"white"}
                  currentCursor={"pointer"}
                  redirectTo={"/home"}
                />
              )
            ) : (
              <Logomin currentColor={theme === "dark" ? "#fff" : "#000"} />
            )}
          </LogoContainer>
          <Menu>
            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/register"}
              onClick={() => handleMenuItemClick("/register")}
            >
              <NavLink to="/register" onClick={handleLogout}>
                <FaRegAddressBook title="Registrar" />
                {isExpanded && <span>Registrar</span>}
              </NavLink>
            </MenuItem>

            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/search"}
              onClick={() => handleMenuItemClick("/search")}
            >
              <NavLink to="/search" onClick={handleLogout}>
                <IoSearch title="Consultar" />
                {isExpanded && <span>Consultar</span>}
              </NavLink>
            </MenuItem>

            {/* {isAdmin && (
              <>
                <MenuItem
                  $isExpanded={isExpanded}
                  $isActive={location.pathname === "/update"}
                  onClick={() => handleMenuItemClick("/update")}
                >
                  <NavLink to="/update" onClick={handleLogout}>
                    <RxUpdate title="Actualizar" />
                    {isExpanded && <span>Actualizar</span>}
                  </NavLink>
                </MenuItem>
                <MenuItem
                  $isExpanded={isExpanded}
                  $isActive={location.pathname === "/delete"}
                  onClick={() => handleMenuItemClick("/delete")}
                >
                  <NavLink to="/delete" onClick={handleLogout}>
                    <AiOutlineDelete title="Eliminar" />
                    {isExpanded && <span>Eliminar</span>}
                  </NavLink>
                </MenuItem>
              </>
            )} */}
            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/update"}
              onClick={() => handleMenuItemClick("/update")}
            >
              <NavLink to="/update" onClick={handleLogout}>
                <RxUpdate title="Actualizar" />
                {isExpanded && <span>Actualizar</span>}
              </NavLink>
            </MenuItem>
            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/delete"}
              onClick={() => handleMenuItemClick("/delete")}
            >
              <NavLink to="/delete" onClick={handleLogout}>
                <AiOutlineDelete title="Eliminar" />
                {isExpanded && <span>Eliminar</span>}
              </NavLink>
            </MenuItem>
          </Menu>
        </div>
        <Footer>
          <Toggle onClick={toggleSidebar} ref={toggleButtonRef}>
            {isExpanded ? <MdOutlineArrowBackIos /> : <MdArrowForwardIos />}
          </Toggle>
          <DarkModeToggle
            isDarkMode={theme === "light" ? false : true}
            onToggle={() => dispatch(toggleTheme())}
          />
        </Footer>
      </SidebarContainer>
    </>
  );
};
