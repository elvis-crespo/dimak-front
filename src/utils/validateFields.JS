export const validateFields = {
  plate: (value) => {
    const regex = /^[A-Z]{3}-\d{4}$/; // Tres letras mayúsculas, guion, cuatro números
    if (!value) return "La placa es obligatoria.";
    if (!regex.test(value)) return "El formato de la placa debe ser AAA-1234.";
    if (value.length !== 8) return "La placa debe tener 8 caracteres.";
    return null; // Sin errores
  },

  ownerName: (value) => {
    const regex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
    if (!value) return "El nombre del propietario es obligatorio.";
    if (!regex.test(value)) return "El nombre solo puede contener letras.";
    return null;
  },

  brand: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras (incluidas con tildes) y espacios
    if (value && !regex.test(value)) {
      return "La marca solo puede contener letras y tildes (á, é, í, ó, ú) y la letra 'ñ'.";
    }
    return null;
  },

  model: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/; // Letras, tildes, 'ñ', números y espacios (no es obligatorio)
    if (value && !regex.test(value)) {
      return "El modelo solo puede contener letras, tildes, la letra 'ñ', números y espacios.";
    }
    return null;
  },

  year: (value) => {
    const currentYear = new Date().getFullYear();
    const regex = /^\d{4}$/; // Solo números de 4 dígitos

    if (value && !regex.test(value))
      return "El año debe tener 4 dígitos numéricos.";

    if (value === "0000") return "El año no puede ser 0000.";

    if (value && (value < 1900 || value > currentYear))
      return `El año debe estar entre 1900 y ${currentYear}.`;

    return null;
  },

  technicianName: (value) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; // Permite letras (incluidas con tildes) y espacios
    if (!value) return "El nombre del técnico es obligatorio.";
    if (!regex.test(value))
      return "El nombre solo puede contener letras y tildes (á, é, í, ó, ú) y la letra 'ñ'.";
    return null;
  },

  date: (value) => {
    if (!value) return "La fecha es obligatoria.";
    const date = new Date(value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Establecer la hora de la fecha actual a 00:00 para evitar comparaciones con horas

    // Comprobar si la fecha seleccionada es anterior a la fecha actual
    if (date < currentDate) {
      return "La fecha no puede ser anterior al día de hoy.";
    }

    if (isNaN(date.getTime())) return "El formato de la fecha no es válido.";
    return null;
  },

  installationCompleted: (value) => {
    const regex = /^[a-zA-Z0-9\s?\/:;+º-]*$/; // Permitimos letras, números, y ciertos símbolos (no es obligatorio)
    if (value && !regex.test(value)) {
      return "La descripción solo puede contener letras, números y los siguientes caracteres: ? / : ; + - º.";
    }
    return null;
  },

  File: (file) => {
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file && file.size > maxSize)
      return "La imagen debe pesar menos de 1MB.";
    return null;
  },
};
