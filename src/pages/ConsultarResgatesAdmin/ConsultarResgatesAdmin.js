import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import AdminTabs from '../../components/AdminTabs/AdminTabs';
import { consultarResgatesPorCpf } from '../../services/resgatesService';

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
      if (err.response && err.response.data && err.response.data.erro) {
        setErro(err.response.data.erro);
      } else if (err.response && err.response.data && err.response.data.message) {
        setErro(err.response.data.message);
      } else {
        setErro('Erro ao pesquisar resgates do usuário.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <AdminTabs />

        <h2 style={{ marginTop: '20px' }}>Consultar Resgates por CPF</h2>

        <form onSubmit={handleBuscar} style={{ display: 'flex', gap: '10px', marginBottom: '20px', marginTop: '15px' }}>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={14}
            style={{ padding: '10px', fontSize: '1rem', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

        {dados && (
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', color: '#333' }}>
            <h3>Usuário: {dados.usuario.nome}</h3>
            <p><strong>CPF:</strong> {dados.usuario.cpf}</p>
            <p><strong>Total de Resgates:</strong> {dados.totalResgates}</p>

            <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ddd' }} />

            <h4>Prêmios Resgatados:</h4>
            {dados.resgates.length === 0 ? (
              <p>Este usuário ainda não realizou nenhum resgate.</p>
            ) : (
              <ul>
                {dados.resgates.map((item) => (
                  <li key={item.id} style={{ marginBottom: '10px' }}>
                    <strong>{item.produtoNome}</strong> — {item.pontos} pontos
                    <br />
                    <small>Data: {new Date(item.criadoEm).toLocaleString('pt-BR')}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
};


export default ConsultarResgatesAdmin;