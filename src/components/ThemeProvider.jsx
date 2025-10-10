import { useState} from "react";
import { ThemeContext } from "./ThemeContext";


export const ThemeProvider = ({children})=>{

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {(theme === 'light') ? setTheme('dark') : setTheme('light')}

return(
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
    )
}

export default ThemeProvider

