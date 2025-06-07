import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Для відповідності з твоїм попереднім кодом
const api = {
  async getCampers(page = 1, filters) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', '4');

    if (filters && filters.location) {
      params.append('location', filters.location);
    }

    if (filters && filters.bodyType) {
      params.append('form', filters.bodyType);
    }

    if (filters && filters.amenities && Array.isArray(filters.amenities)) {
      filters.amenities.forEach(amenity => {
        params.append(amenity, 'true');
      });
    }

    // Запит з параметрами
    const response = await apiClient.get(`?${params.toString()}`);
    return response.data;
  },

  async getCamperById(id) {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },
};

export default api;
