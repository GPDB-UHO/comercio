import { axiosInstance } from "./axios";

export async function createToken(data) {
  try {
    const response = await axiosInstance.post("/token/", data);
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function refreshToken(refresh) {
  try {
    const response = await axiosInstance.post("/token/refresh/", {
      refresh,
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function verifyToken(token) {
  try {
    const response = await axiosInstance.post("/token/verify/", {
      token,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export const fetchProducts = async () => {
  const response = await axiosInstance.get("producto");
  return response.data;
};

export const addProduct = async ({ name, notes }) => {
  const response = await axiosInstance.post("producto/", {
    nombre: name,
    notas: notes,
  });
  return response.data;
};

export const editProduct = async ({ id, name, notes }) => {
  const response = await axiosInstance.patch(`producto/${id}/`, {
    nombre: name,
    notas: notes,
  });
  return response.data;
};

export const fetchNbhd = async () => {
  const response = await axiosInstance.get("reparto");
  return response.data;
};

export const fetchDistributions = async () => {
  const response = await axiosInstance.get("distribucion");
  return response.data;
};

export const addDistribution = async (data) => {
  console.log(data);
  const response = await axiosInstance.post("distribucion/", data);
  return response.data;
};

export const fetchBodegas = async () => {
  const response = await axiosInstance.get("bodega");
  return response.data;
};

// Retorna la cantidad de días sin entregas de un producto X en una oficoda Y
export async function fetchDaysWithoutProducts({ producto }) {
  const response = await axiosInstance.get(
    `graficas/dias-sin-producto/${producto}`
  );
  return response;
}
