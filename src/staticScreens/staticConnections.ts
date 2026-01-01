const botaoSignup = document.querySelector('.signupButton');
if (botaoSignup) {
    botaoSignup.addEventListener('click', () => {
        const nome = (document.querySelector('.signupName') as HTMLTextAreaElement).value;
        const senha = (document.querySelector('.signupPassword') as HTMLTextAreaElement).value;
        fetch('http://localhost:3000/credential/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nome, password: senha })
        })
        .then(res => {
            if(res.ok) console.log("Signup: Deu certo (Sucesso)");
            else console.log("Signup: Deu errado (Erro do servidor)");
        })
        .catch(err => console.log("Signup: Falha na conexão"));
    });
}

const botaoLogin = document.querySelector('.loginButton');
if (botaoLogin) {
    botaoLogin.addEventListener('click', () => {
        const nome = (document.querySelector('.loginName') as HTMLTextAreaElement).value;
        const senha = (document.querySelector('.loginPassword') as HTMLTextAreaElement).value;
        fetch('http://localhost:3000/credential/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nome, password: senha })
        })
        .then(res => {
            if(res.ok) console.log("Login: Deu certo (Sucesso)");
            else console.log("Login: Deu errado (Erro do servidor)");
        })
        .catch(err => console.log("Login: Falha na conexão"));
    });
}