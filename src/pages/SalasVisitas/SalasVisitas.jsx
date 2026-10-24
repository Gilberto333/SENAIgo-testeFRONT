import React, { useState } from 'react';
import { useProgresso } from '../../hooks/useProgresso';
import Header from '../../components/Header/Header';
import Alert from '../../components/Alert/Alert';
import { MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import styles from './SalasVisitas.module.css';

const SecaoSalas = ({ id, titulo, icone: Icone, aberta, onToggle, salas, mensagemVazia }) => (
  <section className={styles.section}>
    <button type="button" className={styles.sectionBtn} onClick={onToggle} aria-expanded={aberta} aria-controls={id}>
      <Icone size={20} className={styles.sectionIcon} />
      <span className={styles.sectionLabel}>{titulo}</span>
      <ChevronDown size={20} className={`${styles.chevron} ${aberta ? styles.chevronOpen : ''}`} />
    </button>
    {aberta && (
      <div id={id} className={styles.sectionBody}>
        {salas.length === 0
          ? <p className={styles.emptyText}>{mensagemVazia}</p>
          : <ul className={styles.roomList}>{salas.map((sala) => <li key={sala.salaId} className={styles.roomItem}>{sala.nome}</li>)}</ul>}
      </div>
    )}
  </section>
);

const SalasVisitas = () => {
  const { salas, visitedRooms, loading, error } = useProgresso();
  const [aberta, setAberta] = useState({ visitadas: false, faltantes: false });
  const alternar = (chave) => setAberta((prev) => ({ ...prev, [chave]: !prev[chave] }));

  const salasVisitadas = salas.filter((sala) => visitedRooms.includes(sala.salaId));
  const salasFaltantes = salas.filter((sala) => !visitedRooms.includes(sala.salaId));

  const semDados = Boolean(error) && salas.length === 0;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h2 className={styles.pageTitle}><MapPin size={24} /><span>Salas Visitadas</span></h2>

        {loading && <Alert variant="info">Carregando salas...</Alert>}
        {error && <Alert variant="error">{error}</Alert>}

        {!loading && !semDados && (
          <>
            <SecaoSalas
              id="secao-visitadas"
              titulo="Salas já visitadas"
              icone={CheckCircle2}
              aberta={aberta.visitadas}
              onToggle={() => alternar('visitadas')}
              salas={salasVisitadas}
              mensagemVazia="Nenhuma sala foi visitada ainda."
            />
            <SecaoSalas
              id="secao-faltantes"
              titulo="Salas que ainda faltam visitar"
              icone={MapPin}
              aberta={aberta.faltantes}
              onToggle={() => alternar('faltantes')}
              salas={salasFaltantes}
              mensagemVazia="Todas as salas já foram visitadas."
            />
          </>
        )}
      </main>
    </div>
  );
};
export default SalasVisitas;