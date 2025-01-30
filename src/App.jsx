/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/themes";
import React, { Suspense, useState } from "react";
import { Sidebar } from "./components/SideBar";
import { useAuth } from "./Hooks/useAuth";
import DropdownMenu from "./components/DropdownMenu";

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
  const theme = useSelector((state) => state.theme.theme); // dark or light string
  const { isLoggedIn } = useAuth();

   const { user } = useSelector((state) => state.user);
   const isAdmin =
     user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
     "Admin";

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <BrowserRouter
        // basename={process.env.PUBLIC_URL}
        future={{
          v7_startTransition: true, // Habilitar la future flag
          v7_relativeSplatPath: true,
        }}
      >
        {isLoggedIn && (
          <>
            <Sidebar theme={theme} isAdmin={isAdmin}></Sidebar>
            <DropdownMenu />
          </>
        )}
        <Suspense
          fallback={
            <div
              style={{
                paddingLeft: "280px",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              Loading... Please wait
            </div>
          }
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            {isLoggedIn ? (
              <Route path="/" element={<Navigate to="/home" />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}

            <Route
              element={
                <ProtectedRoute isAllowed={isLoggedIn} isAdmin={isAdmin} />
              }
            >
              <Route path="/home" element={<Home />} />

              <Route path="/register" element={<RegisterCards />} />
              <Route path="/register-vehicle" element={<RegisterVehicle />} />
              <Route
                path="/register-installation"
                element={<ResgisterIntallations />}
              />

              <Route path="/search" element={<SearchCards />} />
              <Route path="/search-plate" element={<SearchPlate />} />

              <Route
                path="/instllationsRecords"
                element={<InstallationsTable />}
              />
              <Route path="/update" element={<RegisterUpdate />} />

              {isAdmin && (
                <>
                  <Route path="/delete" element={<DeleteCards />} />
                  <Route path="/delete-vehicle" element={<DeleteVehicle />} />
                  <Route
                    path="/delete-installation"
                    element={<DeleteInstallation />}
                  />
                </>
              )}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
