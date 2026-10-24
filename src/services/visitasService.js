import api from './api';

export const registrarVisita = ({ salaId }) =>
  api.post('/registrarLocal', { salaId }).then(({ data }) => data);

export const listarVisitas = () => api.get('/locais').then(({ data }) => data);
