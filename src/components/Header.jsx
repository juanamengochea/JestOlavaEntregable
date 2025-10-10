import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">🎵 MusicApp</h1>
    </header>
  );
}
<button onClick={toggleTheme} className="theme-toggle">
  {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
</button>

export default Header;
