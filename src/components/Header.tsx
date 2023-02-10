import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useThemeSettings } from '../store/store';

export const Header = () => {
  let isDark = useThemeSettings((state) => state.isDark);
  let toggleTheme = useThemeSettings((state) => state.toggleTheme);

  useEffect(() => {
    isDark
      ? document.querySelector('body')?.classList.add('dark')
      : document.querySelector('body')?.classList.remove('dark');
  }, [isDark]);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <nav style={{ display: 'flex', marginLeft: '1rem' }}>
          <Link to='/users'>
            <h2>Follower</h2>
          </Link>
        </nav>
      </div>
      <button onClick={toggleTheme}>{isDark ? 'Light 🌕' : 'Dark 🌑'}</button>
    </header>
  );
};
