import {useTheme} from './useTheme'
const Header =()=>{

    const { theme, toggleTheme } = useTheme();
    
    return (
        <header>
            <h2> Mi App - Tema: {theme}</h2>
            <button onClick={toggleTheme}>Cambiar Tema</button>
        </header>
    )
}

export default Header;