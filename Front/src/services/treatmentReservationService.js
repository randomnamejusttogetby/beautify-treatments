import { myAxios } from "../utils/myAxios";

export const reserveTreatment = async (treatmentId) => {
  const data = await myAxios.post(`/reservations/treatments/${treatmentId}/reserve`).then(res => res.data);
  return data;
};

export const getMyReservations = async () => {
  const data = await myAxios.get('/reservations/my-reservations').then(res => res.data);
  return data;
};

export const getAllReservations = async () => {
  const data = await myAxios.get('/api/v1/reservations').then(res => res.data);
  return data;
};

export const cancelReservation = async (reservationId) => {
  const data = await myAxios.patch(`/reservations/${reservationId}/cancel`).then(res => res.data);
  return data;
};

export const markAsCompleted = async (reservationId) => {
  const data = await myAxios.post(`/reservations/${reservationId}/complete`).then(res => res.data);
  return data;
};

export const getReservation = async (reservationId) => {
  const data = await myAxios.get(`/reservations/${reservationId}`).then(res => res.data);
  return data;
}; 