import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import AdminTabs from '../../components/AdminTabs/AdminTabs';
import { consultarResgatesPorCpf } from '../../services/resgatesService';
import styles from './ConsultarResgatesAdmin.module.css';

const ConsultarResgatesAdmin = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  const handleBuscar = async (e) => {
    e.preventDefault();
    setErro('');
    setDados(null);

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setErro('Por favor, insira um CPF válido com 11 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const resposta = await consultarResgatesPorCpf(cpfLimpo);
      setDados(resposta);
    } catch (err) {
      if (err.response?.data?.erro) {
        setErro(err.response.data.erro);
      } else if (err.response?.data?.message) {
        setErro(err.response.data.message);
      } else {
        setErro('Erro ao pesquisar resgates do usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.container}>
        <AdminTabs />

        <h2 className={styles.title}>Consultar Resgates por CPF</h2>

        <form onSubmit={handleBuscar} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="cpfInput" className={styles.label}>CPF do Usuário</label>
            <input
              id="cpfInput"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={14}
              className={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {erro && <div className={styles.errorAlert}>{erro}</div>}

        {dados && (
          <div className={styles.resultadoContainer}>
            <div className={styles.usuarioCard}>
              <h3 className={styles.usuarioNome}>{dados.usuario.nome}</h3>
              <div className={styles.dadosGrid}>
                <p><strong>CPF:</strong> {dados.usuario.cpf}</p>
                <p>
                  <strong>Total de Resgates:</strong>{' '}
                  <span className={styles.badgeTotal}>{dados.totalResgates}</span>
                </p>
              </div>
            </div>

            <div className={styles.resgatesLista}>
              <h3>Prêmios Resgatados</h3>
              {dados.resgates.length === 0 ? (
                <p className={styles.semResgates}>
                  Este usuário ainda não realizou nenhum resgate.
                </p>
              ) : (
                <ul className={styles.cardsGrid}>
                  {dados.resgates.map((item) => (
                    <li key={item.id} className={styles.resgateCard}>
                      <div className={styles.resgateHeader}>
                        <span className={styles.produtoNome}>{item.produtoNome}</span>
                        <span className={styles.pontosBadge}>{item.pontos} pts</span>
                      </div>
                      <span className={styles.resgateData}>
                        Data: {new Date(item.criadoEm).toLocaleString('pt-BR')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsultarResgatesAdmin;