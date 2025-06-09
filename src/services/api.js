import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const fetchCampers = async (page = 1, filters = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", "4");

    if (filters.location) {
      params.append("location", filters.location);
    }
    if (filters.form) {
      params.append("form", filters.form);
    }

    if (filters.AC) params.append("AC", "true");
    if (filters.automatic) params.append("automatic", "true");
    if (filters.kitchen) params.append("kitchen", "true");
    if (filters.TV) params.append("TV", "true");
    if (filters.bathroom) params.append("bathroom", "true");

    const response = await apiClient.get(`?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch campers");
  }
};


export const fetchCamperById = async (id) => {
  try {
    const responce = await apiClient(`/${id}`)
    return responce.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch camper details");
    
  }
}