import api from './api';

export const obterSaldo = () => api.get('/saldo').then(({ data }) => data);
