export function initAuthListeners() {
    document.addEventListener('click', async (e: Event) => {
        const target = e.target as HTMLElement;

        if (target.matches('.signupButton')) {
            e.preventDefault();
            
            const nameInput = document.querySelector('.signupName') as HTMLTextAreaElement;
            const passInput = document.querySelector('.signupPassword') as HTMLTextAreaElement;

            if (!nameInput || !passInput) return;

            const nome = nameInput.value;
            const senha = passInput.value;

            try {
                const res = await fetch('/credential/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nome, password: senha })
                });

                const data = await res.json();
                
                if (res.ok) {
                    console.log("Signup: Sucesso", data);
                    alert("Conta criada! Vá para o login.");
                } else {
                    console.error("Signup: Erro", data.msg);
                    alert("Erro: " + data.msg);
                }
            } catch (err) {
                console.error("Signup: Falha na conexão", err);
            }
        }

        if (target.matches('.loginButton')) {
            e.preventDefault();

            const nameInput = document.querySelector('.loginName') as HTMLTextAreaElement;
            const passInput = document.querySelector('.loginPassword') as HTMLTextAreaElement;

            if (!nameInput || !passInput) return;

            const nome = nameInput.value;
            const senha = passInput.value;

            try {
                const res = await fetch('credential/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: nome, password: senha })
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("Login: Sucesso", data);
                    window.location.href = "/game";
                    window.dispatchEvent(new PopStateEvent('popstate'));
                } else {
                    console.error("Login: Erro", data.msg);
                    alert("Erro: " + data.msg);
                }
            } catch (err) {
                console.error("Login: Falha na conexão", err);
            }
        }

        if (target.matches('.worlds')) {
            e.preventDefault();

            try {
                const res = await fetch('/credential/getworlds', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include"
                });

                const data = await res.json();
                
                if (res.ok) {
                    //tem q retornar data aqui
                } else {
                    console.error("Signup: Erro", data.msg);
                    alert("Erro: " + data.msg);
                }
            } catch (err) {
                console.error("Signup: Falha na conexão", err);
            }
        }
    });
}