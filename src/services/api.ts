// Obtener la URL base desde el archivo .env
const API_URL = import.meta.env.VITE_API_URL || 'https://guaman-idiomas-ute.online/api/';

// Configuración genérica para las peticiones
const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}` // Descomentar si se usa JWT
  }
};

/**
 * 1. Tabla: Cursos (/courses)
 */
export const getCourses = async () => {
  try {
    const response = await fetch(`${API_URL}courses`, fetchConfig);
    if (!response.ok) throw new Error('Error al obtener cursos');
    return await response.json();
  } catch (error) {
    console.error('API Error (Cursos):', error);
    return null;
  }
};

/**
 * 2. Tabla: Clases (/classes)
 */
export const getClasses = async () => {
  try {
    const response = await fetch(`${API_URL}classes`, fetchConfig);
    if (!response.ok) throw new Error('Error al obtener clases');
    return await response.json();
  } catch (error) {
    console.error('API Error (Clases):', error);
    return null;
  }
};

/**
 * 3. Tabla: Usuarios (/users)
 */
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}users`, fetchConfig);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
  } catch (error) {
    console.error('API Error (Usuarios):', error);
    return null;
  }
};
