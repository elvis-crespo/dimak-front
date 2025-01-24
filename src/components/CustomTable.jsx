/* eslint-disable react/prop-types */
import styled from "styled-components";
import { themeTypography } from "../utils/themes";
import { ButtonDelete } from "./Icons/Icons";
import Swal from "sweetalert2";
import useDeleteVehicle from "../Hooks/useDeleteVehicle";

// const TableContainer = styled.div`
//   padding: 20px;
//   background: ${({ theme }) => theme.background};
//   border-radius: 12px;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   max-width: 75rem;
//   font-family: ${themeTypography.fontFamily};
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background-color: ${({ theme }) => theme.bgForm};
// `;

// const TableHeader = styled.thead`
//   color: ${({ theme }) => theme.text};
//   th {
//     text-align: left;
//     padding: 10px;
//     font-size: 14px;
//     border-bottom: 2px solid #e0e0e0;
//     padding: 10px 50px;
//   }
// `;

// const TableBody = styled.tbody`
//   background: ${({ theme }) => theme.bgForm};
//   tr {
//     border-bottom: 1px solid #e0e0e0;

//     &:hover {
//       background: ${({ theme }) => theme.hoverTable};
//     }
//   }

//   td {
//     padding: 10px;
//     font-size: 14px;
//     vertical-align: middle;
//     padding: 10px 50px;
//   }
// `;


const TableContainer = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 75rem;
  font-family: ${themeTypography.fontFamily};
  overflow: hidden; /* Oculta el desplazamiento horizontal
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.bgForm};
  min-width: 600px; /* Establece un ancho mínimo para que no se rompa el diseño */
  overflow-x: visible; /* Permite el desplazamiento horizontal */
`;

const TableHeader = styled.thead`
  color: ${({ theme }) => theme.text};
  th {
    text-align: left;
    padding: 10px;
    font-size: 14px;
    border-bottom: 2px solid #e0e0e0;
    padding: 10px 50px;
  }
`;

const TableBody = styled.tbody`
  background: ${({ theme }) => theme.bgForm};
  tr {
    border-bottom: 1px solid #e0e0e0;

    &:hover {
      background: ${({ theme }) => theme.hoverTable};
    }
  }

  td {
    padding: 10px;
    font-size: 14px;
    vertical-align: middle;
    padding: 10px 50px;
  }
`;



export const CustomerTable = ({ data, columnsHeader, columnKeys }) => {
  // const columns = columnsHeader.map((column) => column.toLowerCase());
  const { handleFetchDelete } = useDeleteVehicle();

  return (
    <>
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                {columnsHeader.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
                <th>Acciones</th> {/* Nueva columna para el tacho de basura */}
              </tr>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columnKeys.map((key, colIndex) => (
                      <td key={colIndex}>
                        {key === "photoUrl" ? (
                          row[key] ? (
                            <img
                              src={row[key]}
                              alt="Imagen"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                Swal.fire({
                                  imageUrl: row[key],
                                  imageAlt: "Imagen",
                                  customClass: {
                                    popup: "custom-swal-width", // Clase personalizada para el modal
                                  },
                                  showCloseButton: true,
                                });
                              }}
                            />
                          ) : (
                            "No disponible"
                          )
                        ) : key === "date" ? (
                          row[key] && row[key] !== "0001-01-01T00:00:00" ? (
                            new Date(row[key]).toLocaleDateString()
                          ) : (
                            "Fecha no registrada"
                          )
                        ) : (
                          row[key] || "No disponible"
                        )}
                      </td>
                    ))}
                    <td>
                      <ButtonDelete
                        onClick={() => handleFetchDelete(row.plate)} // Función para manejar la eliminación
                        // width="40px !important"
                        // height="20px !important"
                        CustomColor="blue"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columnsHeader.length + 1}
                    style={{ textAlign: "center" }}
                  >
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  );
};