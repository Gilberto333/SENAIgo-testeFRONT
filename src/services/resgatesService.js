import api from './api';

// POST /resgatarProduto -> 201 { sucesso, resgate, pontosGanhos, pontosGastos, saldo }
export const resgatarProduto = ({ produtoId }) =>
  api.post('/resgatarProduto', { produtoId }).then(({ data }) => data);

// GET /resgates -> resgates do usuário logado
export const listarResgates = () => api.get('/resgates').then(({ data }) => data);

// GET /admin/resgates/cpf/:cpf -> consulta resgates de um usuário pelo CPF (Acesso Admin)
export const consultarResgatesPorCpf = (cpf) => {
  const cpfLimpo = String(cpf).replace(/\D/g, '');
  return api.get(`/admin/resgates/cpf/${cpfLimpo}`).then(({ data }) => data);
};