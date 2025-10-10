import Header from "./components/Header";
import ThemeProvider from "./components/ThemeProvider";
import './App.css';
function App() {
  return (
    <ThemeProvider>
      <div>
        <Header />
        <main>
          <p> Contenido de mi app</p>
        </main>
      </div>
    </ThemeProvider>
  );
}
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

export default App;
