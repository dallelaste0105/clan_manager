import { useState } from 'react';

export default function CreateClan() {
  const [nome, setNome] = useState('');
  const [lider, setLider] = useState('');

  async function criarCla() {
    // URL apontando para o seu PHP rodando na porta 8000
    const url = "http://localhost:8000/create_clan.php";

    try {
      const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // AQUI ESTÁ O SEGREDO: Os nomes das chaves ('nome', 'lider') 
        // devem ser iguais aos que o PHP está lendo ($input['nome']).
        body: JSON.stringify({ 
            nome: nome, 
            lider: lider 
        })
      });

      const json = await resposta.json();

      if (json.ok) {
        alert("✅ Clã Criado! ID no Banco: " + json.id);
        setNome("");
        setLider("");
      } else {
        alert("❌ Erro do Servidor: " + json.msg);
      }

    } catch (erro) {
      console.error(erro);
      alert("❌ Erro de Conexão (O PHP está rodando?)");
    }
  }

  return (
    <div style={{ padding: 20, border: '1px solid #444', maxWidth: 300 }}>
      <h3>Novo Clã</h3>
      <input 
        placeholder="Nome do Clã" 
        value={nome} onChange={e => setNome(e.target.value)} 
        style={{ display: 'block', margin: '10px 0', padding: 5 }}
      />
      <input 
        placeholder="Nome do Líder" 
        value={lider} onChange={e => setLider(e.target.value)} 
        style={{ display: 'block', margin: '10px 0', padding: 5 }}
      />
      <button onClick={criarCla} style={{ cursor: 'pointer', padding: '5px 15px' }}>
        Fundar Clã
      </button>
    </div>
  );
}