import { useState } from "react"
import api from "../api";

export default function LoginScreen() {
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");

    async function login({name, password}:{name:string, password:string}) {
        try {
            const res = await api.post("/loginRoute.php", {name, password}, {withCredentials:true})
            window.alert(res.data.msg)
        } 
        catch (err:any) {
            if (err.response) {
                window.alert(err.response.data.msg);
            } else {
                window.alert("Erro inesperado");
            }
        }
    }

    return <div>
        <h1>Tela de Login</h1>
        <textarea value={name} onChange={(e)=>setName(e.target.value)}></textarea>
        <textarea value={password} onChange={(e)=>setPassword(e.target.value)}></textarea>
        <button onClick={()=>login({name, password})}>Login</button>
    </div>
}