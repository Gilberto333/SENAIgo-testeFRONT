import React, { useState } from 'react';
import AdminTabs from '../../components/AdminTabs/AdminTabs';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Alert from '../../components/Alert/Alert';
import { buscarResgatesPorCPF } from '../../services/resgatesService';
import { maskCPF } from '../../utils/masks';
import styles from './ConsultarResgatesAdmin.module.css';

const ConsultarResgatesAdmin = () => {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [mensagemInfo, setMensagemInfo] = useState('');

  const handleCpfChange = (e) => {
    setCpf(maskCPF(e.target.value));
  };

  const handleConsultar = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagemInfo('');
    setResultado(null);

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setErro('Informe um CPF válido com 11 dígitos.');
      return;
    }

    setLoading(true);
    try {
      const data = await buscarResgatesPorCPF(cpfLimpo);
      setResultado(data);
      if (data.message) {
        setMensagemInfo(data.message);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErro(err.response.data.message);
      } else {
        setErro('Erro ao realizar consulta. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <AdminTabs activeTab="resgates" />

      <Card title="Consultar Resgates por CPF">
        <form onSubmit={handleConsultar} className={styles.form}>
          <Input
            label="CPF do Usuário"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            maxLength={14}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Consultando...' : 'Consultar'}
          </Button>
        </form>

        {erro && <Alert type="error" message={erro} />}
        {mensagemInfo && <Alert type="info" message={mensagemInfo} />}

        {resultado && (
          <div className={styles.resultadoContainer}>
            <div className={styles.dadosUsuario}>
              <p><strong>Nome:</strong> {resultado.usuario.nome}</p>
              <p><strong>CPF:</strong> {resultado.usuario.cpf}</p>
            </div>

            <div className={styles.resgatesLista}>
              <h3>Brindes resgatados:</h3>
              {resultado.resgates && resultado.resgates.length > 0 ? (
                <ul>
                  {resultado.resgates.map((item, index) => (
                    <li key={index}>
                      <strong>{item.brinde}</strong> — {item.pontos} pontos — {item.data} às {item.hora}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.semResgates}>Este usuário ainda não realizou nenhum resgate.</p>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ConsultarResgatesAdmin;