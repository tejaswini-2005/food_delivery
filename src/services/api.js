import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

const extractOrdersFromResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.orders)) {
    return payload.orders;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.orders)) {
    return payload.data.orders;
  }

  return [];
};

export const getToken = async (studentId, password, set) => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId,
    password,
    set,
  });

  if (!data?.token || !data?.dataUrl) {
    throw new Error("Invalid token response from server");
  }

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return extractOrdersFromResponse(data);
};