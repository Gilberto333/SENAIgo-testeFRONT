import api from './api';

export const listarSalas = () => api.get('/salas').then(({ data }) => data);

export const listarTodasSalas = () => api.get('/todasSalas').then(({ data }) => data);

export const cadastrarSala = (sala) =>
  api.post('/cadastrarSala', sala).then(({ data }) => data);

export const atualizarSala = (salaId, sala) =>
  api.put(`/atualizarSala/${salaId}`, sala).then(({ data }) => data);

export const removerSala = (salaId) =>
  api.delete(`/removerSala/${salaId}`).then(({ data }) => data);