/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaRegAddressBook } from "react-icons/fa";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { Logo } from "../assets/images/Logo";
import { Logomin } from "../assets/images/Logomin";
import { NavLink, useLocation } from "react-router-dom";
import { themeTypography } from "../utils/themes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DarkModeToggle, { Toggle } from "../utils/DarkModeToggle";
import { toggleTheme } from "../redux/themeReducer";

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
  @media (max-width: 920px) {
    display: none;
    // flex-direction: column;
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
  margin: 10px 8px;
  padding: 2px;
  svg {
    transition: all 0.3s ease;
    border-radius: 15px;
    margin: 10px;
    path {
      // fill: red;
    }
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 15px;
  justify-content: center;
  align-items: flex-start;
`;

const MenuItem = styled.li`
  background-color: ${(props) => (props.$isActive ? props.theme.hover : "transparent")};
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
    text-align: center;
    justify-content: center;

    svg {
      font-size: 20px;
      margin-right: ${(props) => (props.$isExpanded ? "15px" : "0")};
      transition: margin 0.3s ease;
      text-align: center;
      path {
        color: ${({ theme }) => theme.fill};
      }
    }

    span {
      display: ${(props) => (props.$isExpanded ? "inline" : "none")};
      font-weight: 600;
      font-family: ${themeTypography.fontFamily};
      transition: display 0.3s ease;
      text-align: center;
      color: ${({ theme }) => theme.fill};
    }
  }
`;

const Footer = styled.div`
  padding: 30px;
  border-top: 1px solid rgb(220 228 236 / 57%);
  display: flex;
  flex-direction: column;
  gap: 50px;
  transition: all 0.3s ease;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    // transition: background-color 0.3s ease;

    svg {
      margin-right: ${(props) => (props.$isExpanded ? "10px" : "0")};
      transition: background-color 0.3s ease;
      transition: margin 0.3s ease;
      width: 20px;
      height: 20px;
    }

    span {
      //   display: ${(props) => (props.$isExpanded ? "inline" : "none")};
      transition: background-color 0.3s ease;
      padding-left: 10px;
      font-family: ${themeTypography.fontFamily};
    }
  }
`;

export const Sidebar = ({theme}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(isExpanded);

  const toggleSidebar = (e) => {
    setIsExpanded((prev) => !prev);
    e.preventDefault();
  };

  // const themeSelect = useSelector(theme);
  console.log(theme);

  const location = useLocation();

  //redux
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  return (
    <>
      <SidebarContainer $isExpanded={isExpanded}>
        <div>
          <LogoContainer>
            {isExpanded ? (
              <Logo />
            ) : (
              <Logomin currentColor={theme === "dark" ? "#fff" : "#000"} />
            )}
          </LogoContainer>
          {/* <LogoContainer> <Logomin /></LogoContainer> */}
          <Menu>
            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/"}
            >
              <NavLink to="/">
                <FaRegAddressBook title="Registrar" />
                {isExpanded && <span>Registrar</span>}
              </NavLink>
            </MenuItem>

            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/search"}
            >
              <NavLink to="/search">
                <IoSearch title="Consultar" />
                {isExpanded && <span>Consultar</span>}
              </NavLink>
            </MenuItem>

            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/update"}
            >
              <NavLink to="/update">
                <RxUpdate title="Actualizar" />
                {isExpanded && <span>Actualizar</span>}
              </NavLink>
            </MenuItem>

            <MenuItem
              $isExpanded={isExpanded}
              $isActive={location.pathname === "/delete"}
            >
              <NavLink to="/delete">
                <AiOutlineDelete title="Eliminar" />
                {isExpanded && <span>Eliminar</span>}
              </NavLink>
            </MenuItem>
          </Menu>
        </div>
        <Footer>
          <button onClick={toggleSidebar}>
            <Toggle>
              {isExpanded ? <MdOutlineArrowBackIos /> : <MdArrowForwardIos />}
            </Toggle>
          </button>
          <DarkModeToggle
            isDarkMode={theme === "dark" ? true : false}
            onToggle={() => dispatch(toggleTheme())}
          />
        </Footer>
      </SidebarContainer>
    </>
  );
};