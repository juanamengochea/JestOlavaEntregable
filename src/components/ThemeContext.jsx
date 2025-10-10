useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);
<button onClick={toggleTheme}>
  Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
</button>
