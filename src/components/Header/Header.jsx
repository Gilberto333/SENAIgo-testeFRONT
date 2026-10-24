import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgresso } from '../../hooks/useProgresso';
import Logo from '../Logo/Logo';
import { Gift, Trophy, User, Settings } from 'lucide-react'; 
import styles from './Header.module.css';

const Header = () => {
  const { user, isAdmin } = useAuth(); 
  const { saldo } = useProgresso(); 
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}><Link to="/home"><Logo size="small" /></Link></div>
        <div className={styles.centerSection}>
          <div className={styles.greetingBox}><User className={styles.userIcon} size={18} /><span>Olá, <strong>{user?.nome || 'Aluno'}</strong></span></div>
         
        </div>
        <div className={styles.rightSection}>
          <div className={styles.pointsPill}><Trophy size={16} className={styles.trophyIcon} /><span><strong>{saldo}</strong> pts</span></div>
          <nav className={styles.navLinks}>
            {isAdmin && <Link to="/admin/loja" aria-label="Gerenciar" className={`${styles.navBtn} ${location.pathname.startsWith('/admin') ? styles.active : ''}`}><Settings size={18} /><span>Gerenciar</span></Link>}
          
            <Link to="/loja" aria-label="Resgatar Prêmios" className={`${styles.rewardBtn} ${location.pathname === '/loja' ? styles.rewardActive : ''}`}>
              <Gift size={18} className={styles.rewardIcon} />
              <span>Resgatar Prêmios</span>
            </Link>
            
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;