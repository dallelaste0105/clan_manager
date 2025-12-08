import { useState } from "react"
import api from "../api";

export default function SignupScreen() {
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");

    async function signup({name, password}:{name:string, password:string}) {
        try {
            const res = await api.post("/credentialRoute.php", {name, password}, {withCredentials:true})
            window.alert(res.data.msg)
        } 
        catch (err:any) {
            if (err.response) {
                window.alert(err.msg);
            } else {
                window.alert("Erro inesperado");
            }
        }
    }

    return <div>
        <h1>Tela de Signup</h1>
        <textarea value={name} onChange={(e)=>setName(e.target.value)}></textarea>
        <textarea value={password} onChange={(e)=>setPassword(e.target.value)}></textarea>
        <button onClick={()=>signup({name, password})}>Signup</button>
    </div>
}