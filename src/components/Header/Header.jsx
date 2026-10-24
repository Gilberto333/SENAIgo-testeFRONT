import React, { useState, useEffect, useCallback } from 'react'; 
   import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { useProgresso } from '../../hooks/useProgresso';
import Logo from '../Logo/Logo';
import Sidebar from '../Sidebar/Sidebar'; 
import { Gift, ArrowLeft, Trophy, User, Settings, Menu } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  const { user, isAdmin } = useAuth(); 
  const { saldo } = useProgresso(); 
  const location = useLocation();

  const isLoja = location.pathname === '/loja';
  const isAdminArea = location.pathname.startsWith('/admin'); 

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  return (
    <> 
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="sidebar-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Menu size={22} />
          </button>
          <Link to="/home"><Logo size="small" /></Link>
        </div>
        <div className={styles.centerSection}>
          <div className={styles.greetingBox}><User className={styles.userIcon} size={18} /><span>Olá, <strong>{user?.nome || 'Aluno'}</strong></span></div>
         
        </div>
        <div className={styles.rightSection}>
          <div className={styles.pointsPill}><Trophy size={16} className={styles.trophyIcon} /><span><strong>{saldo}</strong> pts</span></div>
          <nav className={styles.navLinks}>
            
            {isAdmin && (
              <Link
                to={isAdminArea ? '/home' : '/admin/loja'}
                aria-label={isAdminArea ? 'Voltar' : 'Gerenciar'}
                className={`${styles.navBtn} ${isAdminArea ? styles.adminBackBtn : ''}`}
              >
                {isAdminArea ? <ArrowLeft size={18} /> : <Settings size={18} />}
                <span>{isAdminArea ? 'Voltar' : 'Gerenciar'}</span>
              </Link>
            )}
          
            <Link
              to={isLoja ? '/home' : '/loja'}
              aria-label={isLoja ? 'Voltar' : 'Resgatar Brindes'}
              className={`${styles.rewardBtn} ${isLoja ? styles.backBtn : ''}`}
            >
              {isLoja
                ? <ArrowLeft size={18} className={styles.rewardIcon} />
                : <Gift size={18} className={styles.rewardIcon} />}
              <span>{isLoja ? 'Voltar' : 'Resgatar Brindes'}</span>
            </Link>
            
          </nav>
        </div>
      </div>
    </header>
    <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
export default Header;