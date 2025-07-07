import { myAxios } from "../utils/myAxios";

export const readTreatments = async () => {
  const data = await myAxios.get('/treatments').then((res) => res.data); 
  return data;
};

export const getTreatment = async (id) => {
  const data = await myAxios.get(`/treatments/${id}`).then((res) => res.data);
  return data;
};

export const createTreatment = async (treatmentData) => {
  const data = await myAxios.post('/treatments', treatmentData).then(res => res.data);
  return data;
};

export const updateTreatment = async (id, treatmentData) => {
  const data = await myAxios.post(`/treatments/${id}/edit`,  treatmentData).then(res => res.data);
  return data;
};

export const deleteTreatment = async (id) => {
  const data = await myAxios.post(`/treatments/${id}/delete`).then(res => res.data);
  return data;
};

export const searchTreatment = async (query) => {
  const data = await myAxios.get(`/treatments/search?q=${encodeURIComponent(query)}`).then(res => res.data);
  return data;
};

 