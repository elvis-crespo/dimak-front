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

  useEffect(() => {
    const fetchData = async () => {
      if (!plate) return;

      setLoading(true);
      setError(null); // Reset error state before making the request

      try {
        const response = await axiosInstance.get(
          `/installation/showall?plate=${plate}`
        );
        setData(response.data.installationRecords);
      } catch (error) {
        alert(`Error al obtener los datos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

      fetchData();
  }, [plate]); // Re-fetch data whenever the plate changes

  return (
    <>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 ? (
        <CustomerTable
          data={data}
          columnsHeader={columnsHeader}
          columnKeys={columnKeys}
        />
      ) : (
        !loading && <p>No se encontraron registros para esta placa.</p>
      )}
    </>
  );
}
