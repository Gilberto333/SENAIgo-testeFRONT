import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, User, MapPin, Trophy, Gift, LogOut } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ usuario = { nome: 'teste' }, areasVisitadas = 0, totalAreas = 0, pontos = 0, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo SENAIgo */}
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logoIconBox}>
            <Gamepad2 size={22} color="#ffffff" />
          </div>
          <span className={styles.logoText}>
            SENAI<span className={styles.logoHighlight}>go</span>
          </span>
        </Link>

        {/* Informações do usuário e ações */}
        <div className={styles.actionsGroup}>
          {/* Usuário */}
          <div className={styles.infoBadge}>
            <User size={18} />
            <span>Olá, <strong>{usuario?.nome || 'Usuário'}</strong></span>
          </div>

          {/* Áreas Visitadas */}
          <div className={styles.infoBadge}>
            <MapPin size={18} className={styles.pinIcon} />
            <span>{areasVisitadas} / {totalAreas} áreas visitadas</span>
          </div>

          {/* Saldo de Pontos */}
          <div className={styles.pointsBadge}>
            <Trophy size={18} />
            <span><strong>{pontos} pts</strong></span>
          </div>

          {/* Alterado: adicionado o texto "Resgatar Prêmios" e ícone de presente em destaque */}
          <Link to="/loja" className={styles.btnResgatar}>
            <Gift size={18} />
            <span>Resgatar Prêmios</span>
          </Link>

          {/* Sair / Logout */}
          <button onClick={onLogout} className={styles.btnLogout} title="Sair">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;