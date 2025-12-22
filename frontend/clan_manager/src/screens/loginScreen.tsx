import { useState } from "react"
import api from "../api";

export default function LoginScreen() {
    const[name, setName] = useState("");
    const[password, setPassword] = useState("");
    const whitchFunction = "login";

    async function login({name, password}:{whitchFunction:string, name:string, password:string}) {
        try {
            const res = await api.post("/credentialRoute.php", {
                whitchFunction: "login",
                name,
                password
                }, { withCredentials: true });
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
        <button onClick={()=>login({whitchFunction, name, password})}>Login</button>
    </div>
}