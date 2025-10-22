import Header from "./components/Header";
import ThemeProvider from "./components/ThemeProvider";
import "./index.css";

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

export default App;
