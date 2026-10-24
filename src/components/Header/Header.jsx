import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        
        <Link to="/" className={styles.logo}>
          <span>Plataforma SENAI</span>
        </Link>

        
        <nav className={styles.nav}>
          
          <Link to="/loja" className={styles.btnResgatarPremios}>
            <div className={styles.iconWrapper}>
              <Gift size={20} />
            </div>
            <span className={styles.btnText}>Resgatar Prêmios</span>
            <Sparkles size={14} className={styles.sparkleIcon} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;