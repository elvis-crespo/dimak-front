/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/themes";
import React, { Suspense, useState } from "react";
import { Sidebar } from "./components/SideBar";
import { useAuth } from "./Hooks/useAuth";

// Lazy loaded components
const RegisterCards = React.lazy(() => import("./Pages/RegisterCards"));
const RegisterVehicle = React.lazy(() => import("./Pages/RegisterVehicle"));
const RegisterUpdate = React.lazy(() => import("./Pages/RegisterUpdate"));
const ResgisterIntallations = React.lazy(() =>
  import("./Pages/RegisterInstallations")
);

const SearchCards = React.lazy(() => import("./Pages/SearchCards"));
const SearchPlate = React.lazy(() => import("./Pages/SearchPlate"));
const InstallationsTable = React.lazy(() =>
  import("./Pages/InstallationsTable")
);

const DeleteCards = React.lazy(() => import("./Pages/DeleteCards"));
const DeleteVehicle = React.lazy(() => import("./Pages/DeleteVehicle"));
const DeleteInstallation = React.lazy(() =>
  import("./Pages/DeleteInstallation")
);

const Home = React.lazy(() => import("./Pages/Home"));
const Login = React.lazy(() => import("./Pages/Login"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));

function App() {
  // const themes = useSelector((state) => state.theme); // dark or light object
  const theme = useSelector((state) => state.theme.theme); // dark or light string
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn", isLoggedIn);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <BrowserRouter
        // basename={process.env.PUBLIC_URL}
        future={{
          v7_startTransition: true, // Habilitar la future flag
        }}
      >
        {isLoggedIn === true && <Sidebar theme={theme}></Sidebar>}
        <Suspense
          fallback={
            <div
              style={{
                paddingLeft: "280px",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              Loading... ❤️
            </div>
          }
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Login />} />

            <Route element={<ProtectedRoute isAllowed = { isLoggedIn } />}>
              <Route path="/delete" element={<DeleteCards />} />
              <Route path="/delete-vehicle" element={<DeleteVehicle />} />
              <Route
                path="/delete-installation"
                element={<DeleteInstallation />}
              />
              <Route path="/home" element={<Home />} />

              <Route path="/register" element={<RegisterCards />} />
              <Route path="/register-vehicle" element={<RegisterVehicle />} />
              <Route
                path="/register-installation"
                element={<ResgisterIntallations />}
              />

              <Route path="/search" element={<SearchCards />} />
              <Route path="/search-plate" element={<SearchPlate />} />

              <Route path="/update" element={<RegisterUpdate />} />
              <Route
                path="/instllationsRecords"
                element={<InstallationsTable />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
