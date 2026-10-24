import api from './api';

export const resgatarProduto = ({ produtoId }) =>
  api.post('/resgatarProduto', { produtoId }).then(({ data }) => data);

export const listarResgates = () => api.get('/resgates').then(({ data }) => data);

export const consultarResgatesPorCpf = (cpf) => {
  const cpfLimpo = String(cpf).replace(/\D/g, '');
  return api.get(`/admin/resgates/cpf/${cpfLimpo}`).then(({ data }) => data);
};