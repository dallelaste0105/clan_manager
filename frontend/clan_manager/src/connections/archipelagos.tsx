import api from "../api";

export async function verifyUserArchipelagos() {
    try {
        const res = await api.get("/archipelagoRoute.php", {
            withCredentials: true 
        });

        // Debug: Vamos ver o tipo exato do dado
        console.log("Tipo da resposta:", typeof res.data);
        console.log("Conteúdo:", res.data);

        let data = res.data;

        // CORREÇÃO: Se o PHP retornou string (acontece se tiver espaço em branco nos arquivos), fazemos o parse manual
        if (typeof data === 'string') {
            try {
                // Tenta encontrar onde começa o JSON real para ignorar lixo/logs do servidor
                const jsonStart = data.indexOf('{');
                const jsonEnd = data.lastIndexOf('}');
                if (jsonStart !== -1 && jsonEnd !== -1) {
                    data = JSON.parse(data.substring(jsonStart, jsonEnd + 1));
                }
            } catch (e) {
                console.error("Erro crítico: PHP retornou JSON inválido.", e);
                return [];
            }
        }

        const seeds = data.msg;

        // Verifica se é um array e se tem itens
        if (Array.isArray(seeds) && seeds.length > 0) {
            return seeds; 
        }
        
        return []; 
    } catch (error) {
        console.error("Erro ao buscar arquipélago:", error);
        return [];
    }
}

export async function saveArchipelagoAndHisIslands(islandsList: number[] = []){
      try {
        const res = await api.post("/archipelagoRoute.php",{
            "whitchFunction":"saveArchipelago",
            "islandsList":islandsList
        },{withCredentials:true});
        return res.data.msg 
      }
      catch{
          return null;
      }
}