import api from './api';

export const login = ({ email, senha }) =>
  api.post('/auth/login', { email, senha }).then(({ data }) => data);

export const cadastrar = ({ cpf, nome, email, senha }) =>
  api.post('/cadastrarUsuario', { cpf, nome, email, senha }).then(({ data }) => data);
