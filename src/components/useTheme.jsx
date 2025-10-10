import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export const useTheme=()=>{
    const ctx = useContext(ThemeContext)
    if(!ctx){
        console.log("no hay contexto");
    }
    return ctx
}

