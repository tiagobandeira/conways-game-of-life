export function validarDados(dados) {
    // Verificar se o objeto está definido
    if (!dados) {
        return false;
    }
    
    // Verificar se todos os campos obrigatórios estão presentes
    if (dados.exibirGrade === undefined) {
        return false
    }
    if (!dados.tipoGrade || !dados.nomeImagem || !dados.velocidade || !dados.posicoesImagem) {
        return false;
    }
    
    // Verificar se o campo "tipo de grade" tem um valor válido
    const tiposValidos = ["circular", "limitada", "ilimitada"];
    if (!tiposValidos.includes(dados.tipoGrade)) {
        return false;
    }
    
    // Verificar se o campo "velocidade" é um número inteiro entre 1 e 10
    if (!Number.isInteger(dados.velocidade) || dados.velocidade < 1 || dados.velocidade > 10) {
        return false;
    }
    
    // Verificar se o campo "exibirGrade" é um booleano
    if (typeof dados.exibirGrade !== "boolean") {
        return false;
    }

    // Verificar se o campo "nomeImagem" é uma string com no máximo 50 caracteres
    if (typeof dados.nomeImagem !== "string" || dados.nomeImagem.length > 50) {
        return false;
    }
    
    // Verificar se o campo "posicoesImagem" é uma matriz não vazia e cada elemento é uma matriz de dois inteiros
    if (!Array.isArray(dados.posicoesImagem) || dados.posicoesImagem.length === 0) {
        return false;
    }
    
    for (let i = 0; i < dados.posicoesImagem.length; i++) {
        const posicao = dados.posicoesImagem[i];
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