export function validateData(data) {
    // Verificar se o objeto está definido
    if (!data) {
        return false;
    }
    
    // Verificar se todos os campos obrigatórios estão presentes
    if (data.exibirGrade === undefined) {
        return false
    }
    if (!data.tipoGrade || !data.nomeImagem || !data.velocidade || !data.posicoesImagem) {
        return false;
    }
    
    // Verificar se o campo "tipo de grade" tem um valor válido
    const tiposValidos = ["circular", "limitada", "ilimitada"];
    if (!tiposValidos.includes(data.tipoGrade)) {
        return false;
    }
    
    // Verificar se o campo "velocidade" é um número inteiro entre 1 e 10
    if (!Number.isInteger(data.velocidade) || data.velocidade < 1 || data.velocidade > 10) {
        return false;
    }
    
    // Verificar se o campo "exibirGrade" é um booleano
    if (typeof data.exibirGrade !== "boolean") {
        return false;
    }

    // Verificar se o campo "nomeImagem" é uma string com no máximo 50 caracteres
    if (typeof data.nomeImagem !== "string" || data.nomeImagem.length > 50) {
        return false;
    }
    
    // Verificar se o campo "posicoesImagem" é uma matriz não vazia e cada elemento é uma matriz de dois inteiros
    if (!Array.isArray(data.posicoesImagem) || data.posicoesImagem.length === 0) {
        return false;
    }
    
    for (let i = 0; i < data.posicoesImagem.length; i++) {
        const posicao = data.posicoesImagem[i];
        if (!Array.isArray(posicao) || posicao.length !== 2 || !Number.isInteger(posicao[0]) || !Number.isInteger(posicao[1])) {
            return false;
        }
    }

    return true;
}


export function toJSON(fileText){
    try {
        var obj = JSON.parse(fileText);
        return obj
    } catch (error) {
        console.log("Arquivo não é válido: ", error)
    }
   
}


async function requestData(requestURL){

    let response = await fetch(requestURL)
    if (!response.ok) {
        throw new Error("Recurso não encontrado")
    }
    return response.json()
}


export async function getFileData(nameFile){
    const root = "https://tiagobandeira.github.io/conways-game-of-life";
    const url = `${root}/data/${nameFile}.json`;
    let data;

    try {
        data = await requestData(url)
    } catch (error) {
        console.log(error)
    }
    
    return data
}

