import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/themes";
import React, { Suspense } from "react";
import { Sidebar } from "./components/SideBar";

// Lazy loaded components
const RegisterCards = React.lazy(() => import("./Pages/RegisterCards"));
const RegisterVehicle = React.lazy(() => import("./Pages/RegisterVehicle"));
const ResgisterIntallations = React.lazy(() => import("./Pages/RegisterInstallations"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
const SearchPlate = React.lazy(() => import("./Pages/SearchPlate"));
const SearchOwner = React.lazy(() => import("./Pages/SearchOwner"));
const SearchCards = React.lazy(() => import("./Pages/SearchCards"));
const InstallationsTable = React.lazy(() => import("./Pages/InstallationsTable"));
const RegisterUpdate = React.lazy(() => import("./Pages/RegisterUpdate"));

function App() {
  // const themes = useSelector((state) => state.theme); // dark or light object
  const theme = useSelector((state) => state.theme.theme); // dark or light string

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Sidebar theme={theme}></Sidebar>
        <Suspense
          fallback={
            <div style={{ paddingLeft: "280px", alignItems: "center",  minHeight: "100vh"}}>
              Loading... ❤️
            </div>
          }
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<RegisterCards />} />
            <Route path="/register-vehicle" element={<RegisterVehicle />} />
            <Route path="/search-plate" element={<SearchPlate />} />
            <Route path="/search" element={<SearchCards />} />
            <Route path="/search-owner" element={<SearchOwner />} />
            <Route path="/update" element={<RegisterUpdate />} />
            <Route
              path="/instllationsRecords"
              element={<InstallationsTable />}
            />
            <Route element={<ProtectedRoute isAllowed={true} />}>
              <Route
                path="/register-installation"
                element={<ResgisterIntallations />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
