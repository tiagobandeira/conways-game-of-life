console.log("==================Jogo da Vida=====================")


// ===================  POSICÃO DAS CELULAS =====================

function obterPosicoesCelulasVizinhas(matriz, x, y, gradeLimitada=true){

    let numeroDeLinhas = matriz.length;
    let numeroDeColunas = matriz[0].length

    let orientacoes = {
        direita: [x,y+1],
        esquerda: [x,y-1],
        superior: [x-1,y],
        inferior: [x+1,y],
        superiorEsquerda: [x-1,y-1],
        superiorDireita: [x-1,y+1],
        inferiorEsquerda: [x+1,y-1],
        inferiorDireita: [x+1,y+1]
    }

    const arrayOrientacoes = [];
    for (const chave in orientacoes) {
        let i = orientacoes[chave][0];
        let j = orientacoes[chave][1];
        
        if (gradeLimitada==false) {
            if (i > numeroDeLinhas-1) {
                i = 0;
            }
            if (i < 0) {
                i = numeroDeLinhas-1
            }
            if (j > numeroDeColunas-1) {
                j = 0;
            }
            if (j < 0) {
                j = numeroDeColunas-1
            } 
        }
       
        arrayOrientacoes.push([i,j])
    }
    return arrayOrientacoes

}


// ================= CONTAGEM DAS CÉLULAS ==========================

function contarCelulasVizinhasVivas(matriz, x, y){          
    let celulasVisinhas = obterPosicoesCelulasVizinhas(matriz,x,y,gradeLimitada=false);
    let contador = 0;

    celulasVisinhas.forEach(celula => {
        
        let i = celula[0];
        let j = celula[1];
        if (matriz[i] != undefined) {
            if (matriz[i][j]==1) {
                 contador += 1;
             }
        }
    });
    return contador;
}

// ================= MATRIZ DE CÉLULAS ==========================

function criarMatriz(x,y){
    let M = [];
    for (let i = 0; i < x; i++) {
        M.push(new Array(y).fill(0))
    }
    return M
}

function limparMatriz(matriz){
    let numeroDeLinhas = matriz.length;
    let numeroDeColunas = matriz[0].length

    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeColunas; j++) {
            matriz[i][j] = 0;
       
        }  
    }
}

function vitalizarCelula(matriz, x, y){
    matriz[x][y] = 1;
}

function finalizarCelula(matriz, x,y){
    matriz[x][y] = 0;
}

function definirEstadoInicial(matriz, posicoes){
    posicoes.forEach(posicao=>{
        let i = posicao[0];
        let j = posicao[1];
        matriz[i][j] = 1
    })
}



// ================= ESTADOS INICIAIS ==========================

// nave
const IMAGEM_NAVE = (x,y)=>{
    return [[x,y],[x+1,y-1],[x+2,y-1],[x+3,y-1],[x+3,y],[x+3,y+1],[x+3,y+2],[x,y+3],[x+2,y+3],]
}

// planador 
const IMAGEM_PLANADOR = (x,y)=>{
    return [[x,y],[x,y+1],[x,y+2],[x+1,y],[x+2,y+1],]
}
                  
// acorn
const IMAGEM_ACORN = (x,y)=>{
    return [[x,y],[x+2,y-1],[x+2,y],[x+1,y+2],[x+2,y+3],[x+2,y+4],[x+2,y+5],]
}

// bote
const IMAGEM_BOTE = (x,y) => {
    return [[x,y-1],[x,y],[x+1,y-1],[x+1,y+1],[x+2,y]]
}

const IMAGEM_BLOCO = (x,y) => {
    return [[x,y],[x+1,y],[x+1,y+1],[x,y+1],]
}

// sapo
const IMAGEM_SAPO = (x,y)=>{
    return [[x,y-1],[x,y],[x,y+1],[x-1,y],[x-1,y+1],[x-1,y+2]]
}

// piscador
const IMAGEM_PISCADOR = (x,y)=>{
    return [[x,y-1],[x,y],[x,y+1]] 
}

// diehard
const IMAGEM_DIEHARD = (x,y)=>{ 
    return [[x,y],[x+1,y-6],[x+1,y-5],[x+2,y-5],[x+2,y-1],[x+2,y],[x+2,y+1],]
}


// ================= GRADE HTML ==========================

function criarGradeHTML(matriz){
    const table = document.getElementById("grade")
    let linhas = ""
    for (let i = 0; i < matriz.length; i++) {     
        let colunas = ""
        for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j] == 1) {
                colunas += `<td onclick="clicarCelulaHTML(${i},${j})" class="bg-black"> </td>`    
            }else{ 
                colunas += `<td onclick="clicarCelulaHTML(${i},${j})"> </td>`  
            }
        }
        linhas += "<tr>"  + colunas + "</tr>"  
    }
    table.innerHTML = linhas
} 

function inicializarGradeHTML(matriz, posCelulasVivas=undefined){
    limparMatriz(matriz)
    definirEstadoInicial(matriz,posCelulasVivas)
    criarGradeHTML(MATRIZ_GRADE)
}

function buscarCelulaNoHTML(x,y){
    let table = document.getElementById("grade")
    let tbody = table.getElementsByTagName("tbody").item(0)
    let linhas = tbody.getElementsByTagName("tr");
    let linha = linhas.item(x);
    let colunas = linha.getElementsByTagName("td");
    let celula = colunas.item(y)
    return celula
}

function buscarValorSeletorImagemHTML(){
    return document.getElementById("seletorImagem").value

}

function selecionarImagemHTML(matriz=MATRIZ_GRADE){

    let valor = buscarValorSeletorImagemHTML();
    let imagem = mapaImagens[valor]

    inicializarGradeHTML(matriz, imagem)
    reiniciar()
}

function criarSeletorImagemHTML(mapaPosicoes){
    let seletorImagem = document.getElementById("seletorImagem")
    let opcoes = "";
    for (const key in mapaPosicoes) {
        opcoes += `<option value="${key}">${key}</option>`
    }
    seletorImagem.innerHTML = opcoes
}

function adicionarCorCelula(x, y){
    
    let celula = buscarCelulaNoHTML(x,y)
    celula.classList.add("bg-black");
    
}

function removerCorCelular(x, y){
    
    let celula = buscarCelulaNoHTML(x,y)
    celula.classList.remove("bg-black");
}

function celulaEstaViva(matriz, x, y){
   return matriz[x][y] == 1
}


function clicarCelulaHTML(x,y,matriz=MATRIZ_GRADE){

    let celula = buscarCelulaNoHTML(x,y);

    let celulaEstaViva = celula.classList.contains("bg-black")
    if(celulaEstaViva == false){
        adicionarCorCelula(x,y)
        vitalizarCelula(matriz,x,y)
    }else{
        removerCorCelular(x,y)
        finalizarCelula(matriz,x,y)
    }
}

function calcularVelocidadeGeracoes(){
    var intervaloVelocidade = document.getElementById("intervaloVelocidade")
    let velocidade = 1000 / parseInt(intervaloVelocidade.value)

    return velocidade
}

// ================= JOGO DA VIDA ==========================

function jogoDaVida(matriz){
    let numeroDeLinhas = matriz.length;
    let numeroDeColunas = matriz[0].length
    let novaMatriz = criarMatriz(numeroDeLinhas, numeroDeColunas)
    
    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeColunas; j++) {
            let visinhosVivos = contarCelulasVizinhasVivas(matriz, i, j);

            /* Regras do jogo da vida:
            Toda célula morta com exatamente três vizinhos vivos torna-se viva (nascimento).
            Toda célula viva com menos de dois vizinhos vivos morre por isolamento.
            Toda célula viva com mais de três vizinhos vivos morre por superpopulação.
            Toda célula viva com dois ou três vizinhos vivos permanece viva. */

           novaMatriz[i][j] = matriz[i][j]
            if (celulaEstaViva(matriz,i,j) == false) {
                if (visinhosVivos == 3) {
                    vitalizarCelula(novaMatriz, i, j)
                    adicionarCorCelula(i,j);
                }
            }else {
                if (visinhosVivos < 2 || visinhosVivos > 3) {
                    finalizarCelula(novaMatriz, i, j);
                    removerCorCelular(i,j);
                } 
            }

       
        } 
    }

    // atualiza a matriz de referencia
    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeColunas; j++) {
            matriz[i][j] = novaMatriz[i][j];
       
        }  
    }
   
}

// ================= INICIAR JOGO ==========================

const NUMERO_DE_LINHAS = 15;
const NUMERO_DE_COLUNAS = 30;

const POS_X = 5;
const POS_Y = 13;

const mapaImagens = {
    nave: IMAGEM_NAVE(POS_X,POS_Y),
    planador: IMAGEM_PLANADOR(POS_X,POS_Y),
    acorn: IMAGEM_ACORN(POS_X,POS_Y),
    diehard: IMAGEM_DIEHARD(POS_X,POS_Y),
    bote: IMAGEM_BOTE(POS_X,POS_Y), 
    sapo: IMAGEM_SAPO(POS_X,POS_Y),
    piscador: IMAGEM_PISCADOR(POS_X,POS_Y),
    bloco: IMAGEM_BLOCO(POS_X,POS_Y)
}

var MATRIZ_GRADE = criarMatriz(NUMERO_DE_LINHAS, NUMERO_DE_COLUNAS);

var iniciar = (loop=true)=>{
    
    let IntervaloID;
    let rodando = false;
    let velocidade = calcularVelocidadeGeracoes();

    definirEstadoInicial(MATRIZ_GRADE, IMAGEM_NAVE(POS_X,POS_Y))

    criarGradeHTML(MATRIZ_GRADE);
    criarSeletorImagemHTML(mapaImagens)

    if(loop){
        IntervaloID = setInterval(jogoDaVida, velocidade, MATRIZ_GRADE)
        rodando = true
    }

    // ============== Controles =======================
    this.reiniciar = ()=>{
        clearInterval(IntervaloID)
        rodando = false

        let valor = buscarValorSeletorImagemHTML();
        let imagem = mapaImagens[valor]

        velocidade = calcularVelocidadeGeracoes();

        inicializarGradeHTML(MATRIZ_GRADE, imagem)
    }

    this.rodar = ()=>{
        if (rodando==false) {
            velocidade = calcularVelocidadeGeracoes();
            IntervaloID = setInterval(jogoDaVida, velocidade, MATRIZ_GRADE);
            rodando = true
        }
    }
    
    this.pausar = ()=>{
        if (rodando==true) {
            clearInterval(IntervaloID);
            rodando = false
        }
    }

    this.limpar = () =>{
        clearInterval(IntervaloID)
        rodando = false
        
        inicializarGradeHTML(MATRIZ_GRADE, [])

    }

    this.mudarVelocidade = ()=>{
        if (rodando == true) {
            clearInterval(IntervaloID);
            velocidade = calcularVelocidadeGeracoes();
            IntervaloID = setInterval(jogoDaVida, velocidade, MATRIZ_GRADE);
        }
    }   
}

iniciar(loop=false);