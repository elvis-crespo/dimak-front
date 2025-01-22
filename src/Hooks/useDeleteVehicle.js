// import { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// const useDeleteVehicle = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

//   const handleFetch = async (plateVehicle) => {
//     // setLoading(true);
//     // setError(null);

//     try {
//       const response = await axios.delete(
//         `https://localhost:7131/api/v1/vehicle/delete?plateVehicle=${plateVehicle}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return response.data; // Suponiendo que response.data contiene los campos 'success' y 'message'
//     } catch (error) {
//     //   setLoading(false);

//       if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
//         // Error de conexión
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
//         });
//       } else if (!error.response) {
//         // Error sin respuesta del servidor
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Hubo un problema desconocido con el servidor.",
//         });
//       } else {
//         // Error con respuesta del servidor (404, 500, etc.)
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: `Error al eliminar el vehículo: ${
//             error.response.data?.message || error.message
//           }`,
//         });
//       }

//       return error.response.data;
//     } 
//   };

 
// };

// export default useDeleteVehicle;


import axios from "axios";
import Swal from "sweetalert2";

const useDeleteVehicle = () => {
  const handleFetchDelete = async (plateVehicle) => {
    try {
      const response = await axios.delete(
        `https:localhost:7131/api/v1/vehicle/delete?plateVehicle=${plateVehicle}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    //   Devuelve los datos, asumiendo que response.data contiene success y message
      if (response.data.isSuccess) {
        Swal.fire("Éxito", response.data.message, "success");
      }

      return response.data;
    } catch (error) {
      // Muestra el error con SweetAlert
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al eliminar el vehículo: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      console.error("Error deleting vehicle:", error);
    }
  };

  return {
    handleFetchDelete,
  };
};

export default useDeleteVehicle;
