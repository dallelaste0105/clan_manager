import { useState } from "react";

export default function InsertScreen() {
  const [name, setName] = useState("");

  function send() {
    fetch("http://localhost/backend/insert.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={send}>Enviar</button>
    </div>
  );
}
