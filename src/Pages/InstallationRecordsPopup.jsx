// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import { CustomerTable } from "../components/CustomTable";
// import axiosInstance from "../utils/axiosInstance";

// export default function InstallationsRecordsPopup({ plate }) {
//   const columnsHeader = [
//     "Placa",
//     "Nº de Factura",
//     "Nº de ficha técnica",
//     "Detalles de la Instalación",
//     "Técnico",
//     "Fecha",
//     "Foto",
//   ];
//   const columnKeys = [
//     "plateId",
//     "invoiceNumber",
//     "technicalFileNumber",
//     "installationCompleted",
//     "technicianName",
//     "date",
//     "photoUrl",
//   ];

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!plate) return;

//       setLoading(true);
//       setError(null); // Reset error state before making the request

//       try {
//         const response = await axiosInstance.get(
//           `/installation/showall?plate=${plate}`
//         );
//         setData(response.data.installationRecords);
//       } catch (error) {
//         alert(`Error al obtener los datos: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//       fetchData();
//   }, [plate]); // Re-fetch data whenever the plate changes

//   return (
//     <>
//       {loading && <p>Cargando...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {data.length > 0 ? (
//         <CustomerTable
//           data={data}
//           columnsHeader={columnsHeader}
//           columnKeys={columnKeys}
//         />
//       ) : (
//         !loading && <p>No se encontraron registros para esta placa.</p>
//       )}
//     </>
//   );
// }



/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { CustomerTable } from "../components/CustomTable";
import axiosInstance from "../utils/axiosInstance";

export default function InstallationsRecordsPopup({ plate }) {
  const columnsHeader = [
    "Placa",
    "Nº de Factura",
    "Nº de ficha técnica",
    "Detalles de la Instalación",
    "Técnico",
    "Fecha",
    "Foto",
  ];
  const columnKeys = [
    "plateId",
    "invoiceNumber",
    "technicalFileNumber",
    "installationCompleted",
    "technicianName",
    "date",
    "photoUrl",
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortDir, setSortDir] = useState("desc");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (!plate) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(
          `/installation/showall?plate=${plate}&pageNumber=${page}&pageSize=5&sortDir=${sortDir}`
        );

        setData(response.data.installationRecords);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError(`Error al obtener los datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [plate, page, sortDir]); // Se actualiza cuando cambia la placa, la página o el orden

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 ? (
        <>
          <CustomerTable
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
          />
          {/* Controles de paginación y ordenamiento */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", overflowY: "hidden" }}>
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Siguiente
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}>
              Orden: {sortDir === "asc" ? "Ascendente" : "Descendente"}
            </button>
          </div>
        </>
      ) : (
        !loading && <p>No se encontraron registros para esta placa.</p>
      )}
    </>
  );
}
