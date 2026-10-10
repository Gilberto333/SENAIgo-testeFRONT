import api from './api';

// GET /salas -> [{ salaId, sala, pontos, icone, descricao }]
export const listarSalas = () => api.get('/salas').then(({ data }) => data);
