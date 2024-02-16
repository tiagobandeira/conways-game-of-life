console.log("==================Jogo da Vida=====================")


// ===================  POSICÃO DAS CELULAS =====================

function obterTodasPosicoesAdjacentes(x,y){
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

    return Object.values(orientacoes)
}

async function obterPosicoesCelulasVizinhasGradeIlimitada(matriz, x,y){
    const numeroDeLinhas = matriz.length;
    const numeroDeColunas = matriz[0].length

    let celulaEstaViva = matriz[x][y] == 1
    
    let celulaEstaNaBorda = (
        x == 0 || x == numeroDeLinhas-1 || 
        y == 0 || y == numeroDeColunas-1
    )

    
    if (celulaEstaViva && celulaEstaNaBorda) {

        let novaMatriz = criarCopiarMatriz(matriz)

        if (x == 0) {
            adicionarLinhaSuperiorMatriz(novaMatriz)
            x = 1
        }
        if (x==numeroDeLinhas-1) {
            adicionarLinhaInferiorMatriz(novaMatriz)
        }
        if (y==0) {
            adicionarColunaEsquerdaMatriz(novaMatriz)
            y = 1
        }
        if (y==numeroDeColunas -1) {
            adicionarColunaDireitaMatriz(novaMatriz)
        }

        await atualizarTamanhoGradeDinamicamente(matriz=novaMatriz)
    }

    let arrayOrientacoes = obterTodasPosicoesAdjacentes(x,y);

    return arrayOrientacoes


}


function obterPosicoesCelulasVizinhasGradeLimitada(x,y){

    let arrayOrientacoes = obterTodasPosicoesAdjacentes(x,y)

    return arrayOrientacoes

}

function obterPosicoesCelulasVizinhasGradeCircular(matriz,x,y){
    const numeroDeLinhas = matriz.length
    const numeroDeColunas = matriz[0].length
  

    let arrayOrientacoes = obterTodasPosicoesAdjacentes(x,y);

    for (let i = 0; i < arrayOrientacoes.length; i++) {
       let x = arrayOrientacoes[i][0]
       let y = arrayOrientacoes[i][1]

       if (x > numeroDeLinhas-1) {
            x = 0;
        }
        if (x < 0) {
            x = numeroDeLinhas-1
        }
        if (y > numeroDeColunas-1) {
            y = 0;
        }
        if (y < 0) {
            y = numeroDeColunas-1
        } 

        arrayOrientacoes[i][0] = x
        arrayOrientacoes[i][1] = y
       
    }

    return  arrayOrientacoes
}

function obterPosicoesCelulasVizinhas(matriz, x, y, tipoGrade="circular"){

    if (tipoGrade == "circular") { return obterPosicoesCelulasVizinhasGradeCircular(matriz, x, y)}
    
    if (tipoGrade == "limitada") { return obterPosicoesCelulasVizinhasGradeLimitada(x,y)}

    if(tipoGrade == "ilimitada"){ return new Promise((resolve, reject) => 
        resolve(obterPosicoesCelulasVizinhasGradeIlimitada(matriz,x,y))
    )}
}


// ================= CONTAGEM DAS CÉLULAS ==========================

async function contarCelulasVizinhasVivas(matriz, x, y){          
    let celulasVisinhas = await obterPosicoesCelulasVizinhas(matriz,x,y,tipoGrade=TIPO_GRADE);
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


function adicionarColunaEsquerdaMatriz(matriz){
    for (let i = 0; i < matriz.length; i++) {
        matriz[i].unshift(0) 
    }
}

function adicionarColunaDireitaMatriz(matriz){
   
    for (let i = 0; i < matriz.length; i++) {
        matriz[i].push(0)
    }
}

function adicionarLinhaSuperiorMatriz(matriz){
    matriz.unshift(new Array(matriz[0].length))

}

function adicionarLinhaInferiorMatriz(matriz){
    matriz.push(new Array(matriz[0].length))
}


function criarCopiarMatriz(matriz){
    let numeroDeLinhas = matriz.length
    let numeroDeColunas = matriz[0].length
    let matrizCopia = criarMatriz(numeroDeLinhas, numeroDeColunas)

    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeColunas; j++) {
            matrizCopia[i][j] = matriz[i][j]
            
        }
    }

    return matrizCopia
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
    let linhas = "";
    let celula = "";
    for (let i = 0; i < matriz.length; i++) {     
        let colunas = ""
        for (let j = 0; j < matriz[0].length; j++) {
            celula = `<div class="cell" onclick="clicarCelulaHTML(${i},${j})"></div>`
            if (matriz[i][j] == 1) {
                colunas += `<td class="bg-color">${celula}</td>`    
            }else{ 
                colunas += `<td>${celula}</td>`  
            }
        }
        linhas += "<tr>"  + colunas + "</tr>"  
    }
    table.innerHTML = linhas
} 

function burcarMaiorXYImagem(posicoes){
    let maiorPosX = 0;
    let maiorPosY = 0;

    posicoes.forEach(posicao => {
        if (posicao[0] > maiorPosX) {
            maiorPosX = posicao[0]
        }

        if (posicao[1] > maiorPosY) {
            maiorPosY = posicao[1]
        }
    });
    
    return [maiorPosX, maiorPosY];

}

function reiniciarGradeHTML(matriz, posCelulasVivas=undefined){

    if (!posCelulasVivas) {
        posCelulasVivas = mapaImagens[buscarValorSeletorImagemHTML()]
    }

    let [maiorPosXImagem, maiorPosYImagem] = burcarMaiorXYImagem(posCelulasVivas)

    if (maiorPosXImagem > NUMERO_DE_LINHAS || maiorPosYImagem > NUMERO_DE_COLUNAS) {
        matriz = criarMatriz(maiorPosXImagem+3, maiorPosYImagem+3);
    }else{
        matriz = criarMatriz(NUMERO_DE_LINHAS, NUMERO_DE_COLUNAS);
    }

    MATRIZ_GRADE = matriz

    definirEstadoInicial(matriz,posCelulasVivas)
    criarGradeHTML(matriz)
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

function selecionarImagemHTML(){

    let valor = buscarValorSeletorImagemHTML();
    let imagem = mapaImagens[valor]

    reiniciar(imagem)
}

function criarSeletorImagemHTML(mapaPosicoes){
    let seletorImagem = document.getElementById("seletorImagem")
    let opcoes = "";
    for (const key in mapaPosicoes) {
        opcoes += `<option value="${key}">${key}</option>`
    }
    seletorImagem.innerHTML = opcoes
}

function selecionarTipoGradeHTML(){
    let valor = document.getElementById("seletorTipoGrade").value
    let table = document.getElementById("grade")
    let tipoBorda = ""
    
    TIPO_GRADE = valor
    table.classList.remove("border")

    if (TIPO_GRADE == "limitada") {
        tipoBorda = "solid"
    }
    if(TIPO_GRADE=="circular"){
        tipoBorda = "dashed"
    }
    

    table.style.border = tipoBorda
}

function criarSeletorTipoGradeHTML(){
    let seletorTipoGrade = document.getElementById("seletorTipoGrade")
    let tipoGrade = ["circular", "limitada","ilimitada"]
    let opcoes = "";
    tipoGrade.forEach(tipo => {
        opcoes += `<option value="${tipo}">${tipo}</option>`
    });

    seletorTipoGrade.innerHTML = opcoes
}


function adicionarCorCelula(x, y){
    
    let celula = buscarCelulaNoHTML(x,y)
    celula.classList.add("bg-color");
    
}

function removerCorCelular(x, y){
    
    let celula = buscarCelulaNoHTML(x,y)
    celula.classList.remove("bg-color");
}

function celulaEstaViva(matriz, x, y){
   return matriz[x][y] == 1
}


function clicarCelulaHTML(x,y,matriz=MATRIZ_GRADE){

    let celulaViva = celulaEstaViva(matriz,x,y);
    if(celulaViva == false){
        adicionarCorCelula(x,y)
        vitalizarCelula(matriz,x,y)
    }else{
        removerCorCelular(x,y)
        finalizarCelula(matriz,x,y)
    }
}

function calcularVelocidadeGeracoes(){
    var intervaloVelocidade = document.getElementById("intervaloVelocidade")
    let velocidade = 700 / parseInt(intervaloVelocidade.value)

    return velocidade
}

function atualizarTamanhoGradeDinamicamente( matriz){
    return new Promise((resolve)=>{
        criarGradeHTML(matriz)
        MATRIZ_GRADE = matriz
    })
}

function definirZoom(zoom=100){
    var table = document.getElementById("grade");
    table.style.zoom = `${zoom}%`;
    ZOOM = zoom;
}

function aumentarZoom(){
    var table = document.getElementById("grade");
    if (ZOOM > 140) {
        return;
    }
    ZOOM += 10
    table.style.zoom = `${ZOOM}%`
}

function diminuirZoom(){
    var table = document.getElementById("grade");
    if (ZOOM == 10) {
        return;
    }
    ZOOM -= 10
    table.style.zoom = `${ZOOM}%`
}

function vizualizarGrade() {
    var cheque = document.getElementById("chequeExibirGrade");
    var table  = document.getElementById("grade");

    if (cheque.checked) {
        table.classList.add("visible-grid")
    }else{
        table.classList.remove("visible-grid")
    }
}

// ================= JOGO DA VIDA ==========================

async function jogoDaVida(matriz){
    let numeroDeLinhas = matriz.length;
    let numeroDeColunas = matriz[0].length
    let novaMatriz = criarMatriz(numeroDeLinhas, numeroDeColunas)
    
    for (let i = 0; i < numeroDeLinhas; i++) {
        for (let j = 0; j < numeroDeColunas; j++) {
            let visinhosVivos = await contarCelulasVizinhasVivas(matriz, i, j);

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
const NUMERO_DE_COLUNAS = 15;

const POS_X = parseInt(NUMERO_DE_LINHAS / 2) - 1;
const POS_Y = parseInt(NUMERO_DE_COLUNAS / 2) -1;

const mapaImagens = {
    nave: IMAGEM_NAVE(POS_X,POS_Y),
    planador: IMAGEM_PLANADOR(POS_X,POS_Y),
    acorn: IMAGEM_ACORN(POS_X,POS_Y),
    diehard: IMAGEM_DIEHARD(POS_X,POS_Y+3),
    bote: IMAGEM_BOTE(POS_X,POS_Y), 
    sapo: IMAGEM_SAPO(POS_X,POS_Y),
    piscador: IMAGEM_PISCADOR(POS_X,POS_Y),
    bloco: IMAGEM_BLOCO(POS_X,POS_Y),
    imagemDeTeste: [[4,6],[13, 18]]
}

var MATRIZ_GRADE = criarMatriz(NUMERO_DE_LINHAS, NUMERO_DE_COLUNAS);

var TIPO_GRADE = "circular";

var ZOOM = 100;

definirEstadoInicial(MATRIZ_GRADE, IMAGEM_NAVE(POS_X,POS_Y))
criarGradeHTML(MATRIZ_GRADE);
criarSeletorImagemHTML(mapaImagens)
criarSeletorTipoGradeHTML()
vizualizarGrade()

var iniciar = (rodando = true) => {
    let velocidade = calcularVelocidadeGeracoes();

    setTimeout(()=>{
        if (!rodando) {return;}
        
        jogoDaVida(MATRIZ_GRADE)

        iniciar()
    }, velocidade)


    this.reiniciar = (imagem=undefined)=>{
        rodando = false;
        reiniciarGradeHTML(MATRIZ_GRADE, imagem)
        definirZoom()
    }

    this.rodar = ()=>{
        if (rodando) {return;}

        rodando = true;
        iniciar()
    }

    this.pausar = ()=>{
        if (!rodando) {return;}

        rodando = false;
    }

    this.limpar = () =>{
        rodando = false;
        limparMatriz(MATRIZ_GRADE)
        criarGradeHTML(MATRIZ_GRADE)
    }

    this.mudarVelocidade = ()=>{
        velocidade = calcularVelocidadeGeracoes();
    }   
}

iniciar(rodando=false)