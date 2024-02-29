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

function obterPosicoesCelulasVizinhas(matriz, x, y, tipoGrade){

    var tipoGrade = tipoGrade ||  "circular"

    if (tipoGrade == "circular") { return obterPosicoesCelulasVizinhasGradeCircular(matriz, x, y)}
    
    if (tipoGrade == "limitada") { return obterPosicoesCelulasVizinhasGradeLimitada(x,y)}

    if(tipoGrade == "ilimitada"){ return new Promise((resolve, reject) => 
        resolve(obterPosicoesCelulasVizinhasGradeIlimitada(matriz,x,y))
    )}
}

export function obterTodasPosicoesCelulasVivas(){
    
    if (!MATRIZ_GRADE) { return []; }
    
    let posicoes = [];
    for (let i = 0; i < MATRIZ_GRADE.length; i++) {
        for (let j = 0; j < MATRIZ_GRADE[i].length; j++) {
            let item = MATRIZ_GRADE[i][j];
            if (item == 1) {
                posicoes.push([i,j])
            }
        }
        
    }
    return posicoes
}


// ================= CONTAGEM DAS CÉLULAS ==========================

async function contarCelulasVizinhasVivas(matriz, x, y){          
    let celulasVisinhas = await obterPosicoesCelulasVizinhas(matriz,x,y,TIPO_GRADE);
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
        if (i < matriz.length && j < matriz[0].length) {
            matriz[i][j] = 1
        }
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
export function obterAlturaMatriz() {
    return MATRIZ_GRADE.length
}

export function obterLarguraMatriz() {
    return MATRIZ_GRADE[0].length
}


// ================= GRADE HTML ==========================

function criarGradeHTML(matriz){
    const grade = document.getElementById("grade")
    let linhas = "";
    let celula = "";
    for (let i = 0; i < matriz.length; i++) {     
        let colunas = ""
        for (let j = 0; j < matriz[0].length; j++) {
            celula = `<div class="cell" data-x="${i}" data-y="${j}" ></div>`
            if (matriz[i][j] == 1) {
                colunas += `<td class="bg-color">${celula}</td>`    
            }else{ 
                colunas += `<td>${celula}</td>`  
            }
        }
        linhas += "<tr>"  + colunas + "</tr>"  
    }

    grade.innerHTML = linhas
    
    // adicionado evento click as celulas
    document.querySelectorAll(".cell").forEach(celula => {
    
        var x = parseInt(celula.getAttribute("data-x"))
        var y = parseInt(celula.getAttribute("data-y"))
        
        celula.addEventListener("click", ()=>{
            clicarCelulaHTML(x,y)
        })
    });
    
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

export function reiniciarGradeHTML(largura, altura, posCelulasVivas=undefined){

    largura = largura || NUMERO_DE_COLUNAS;
    altura  = altura  || NUMERO_DE_LINHAS;

    let matriz;

    if (!posCelulasVivas) {
        let imagem = MAPA_IMAGENS[buscarValorSeletorImagemHTML()]
        posCelulasVivas = imagem.posicoesImagem
    }

    let [maiorPosXImagem, maiorPosYImagem] = burcarMaiorXYImagem(posCelulasVivas)

    if (maiorPosXImagem > NUMERO_DE_LINHAS || maiorPosYImagem > NUMERO_DE_COLUNAS) {
        matriz = criarMatriz(maiorPosXImagem+3, maiorPosYImagem+3);
    }else{
        matriz = criarMatriz(altura, largura);
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

export function selecionarImagemHTML(){

    let valor = buscarValorSeletorImagemHTML();
    let imagem = MAPA_IMAGENS[valor].posicoesImagem
    let tipoGrade = MAPA_IMAGENS[valor].tipoGrade
    let velocidade = MAPA_IMAGENS[valor].velocidade
    
    selecionarTipoGradeHTML(tipoGrade)
    calcularVelocidadeGeracoes(velocidade)
    reiniciar(imagem)
}

async function criarSeletorImagemHTML(){
    let seletorImagem = document.getElementById("seletorImagem")
    let mapaImagens = await obterMapaImagens() || IMAGEM_INICIAL
    let opcoes = "";
    for (const key in mapaImagens) {
        let nomeImagem = mapaImagens[key].nomeImagem
        opcoes += `<option value="${key}">${nomeImagem}</option>`
    }
    seletorImagem.innerHTML = opcoes
}

export function selecionarTipoGradeHTML(valor){
    let seletorTipoGrade = document.getElementById("seletorTipoGrade")
    let table = document.getElementById("grade")
    
    if (valor) {
        seletorTipoGrade.value = valor
    }
    
    let tipoBorda = "solid"
    let corBorda = "var(--cell-bg-color)"
    
    TIPO_GRADE = seletorTipoGrade.value
    table.classList.remove("border")

    if (TIPO_GRADE == "ilimitada") {
        corBorda = "transparent"
    }
    if(TIPO_GRADE=="circular"){
        tipoBorda = "dashed"
    }
    
    table.style.border = tipoBorda
    table.style.borderColor = corBorda
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


export function clicarCelulaHTML(x,y){
    let celulaViva = celulaEstaViva(MATRIZ_GRADE,x,y);
    if(celulaViva == false){
        adicionarCorCelula(x,y)
        vitalizarCelula(MATRIZ_GRADE,x,y)
    }else{
        removerCorCelular(x,y)
        finalizarCelula(MATRIZ_GRADE,x,y)
    }
}

export function calcularVelocidadeGeracoes(velocidade){
    var intervaloVelocidade = document.getElementById("intervaloVelocidade")
    if (velocidade) {
        intervaloVelocidade.value = velocidade
    }
    velocidade = 700 / parseInt(intervaloVelocidade.value)

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

export function aumentarZoom(){
    var table = document.getElementById("grade");
    if (ZOOM > 400) {
        return;
    }
    ZOOM += 10
    table.style.zoom = `${ZOOM}%`
}

export function diminuirZoom(){
    var table = document.getElementById("grade");
    if (ZOOM < 30) {
        return;
    }
    ZOOM -= 10
    table.style.zoom = `${ZOOM}%`
}

export function vizualizarGrade(valor) {
    var table  = document.getElementById("grade");
    var cheque = document.getElementById("chequeExibirGrade")
    
    if (valor !== undefined) {
        cheque.checked = valor
    }
    
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

// ===================  CONTROLES =========================
export const reiniciar = (imagem=undefined)=>{
    RODANDO = false;
    reiniciarGradeHTML(NUMERO_DE_LINHAS, NUMERO_DE_COLUNAS, imagem)
    definirZoom()
}

export const rodar = ()=>{
    if (RODANDO) {return;}

    RODANDO = true;
    iniciar()
}

export const pausar = ()=>{
    if (!RODANDO) {return;}

    RODANDO = false;
}

export const limpar = () =>{
    RODANDO = false;
    limparMatriz(MATRIZ_GRADE)
    criarGradeHTML(MATRIZ_GRADE)
}

export const mudarVelocidade = ()=>{
    VELOCIDADE = calcularVelocidadeGeracoes();
}   


// ================= INICIAR JOGO ==========================

import { getFileData } from "./processData.js";

const NUMERO_DE_LINHAS = 15;
const NUMERO_DE_COLUNAS = 15;

const obterMapaImagens = async () => {

    const nomeArquivos = ["ship", "glider","acorn","diehard","boat","toad","blinker","block","gliderGun"];
    
    let map = {};
    let promises = nomeArquivos.map(nomeArquivo => getFileData(nomeArquivo)); 
    let imagens = await Promise.all(promises);

    if (!imagens[0]) { return; }
    
    for (let i = 0; i < imagens.length; i++) {
        let chave = nomeArquivos[i];
        map[chave] = imagens[i]
    }
   
    return map
}

var MATRIZ_GRADE = criarMatriz(NUMERO_DE_LINHAS, NUMERO_DE_COLUNAS);
var VELOCIDADE = calcularVelocidadeGeracoes();
var TIPO_GRADE = "circular";
var RODANDO = false;
var ZOOM = 100;

const IMAGEM_INICIAL = {ship:{
    tipoGrade:"circular",
    nomeImagem:"Espaçonave peso-leve",
    velocidade:6,
    exibirGrade:true,
    posicoesImagem:[[6,6],[6,9],[7,5],[8,5],[8,9],[9,5],[9,6],[9,7],[9,8]]
}}
const MAPA_IMAGENS = await obterMapaImagens() || IMAGEM_INICIAL
const POSICOES_INICIAL  = MAPA_IMAGENS["ship"].posicoesImagem 

definirEstadoInicial(MATRIZ_GRADE, POSICOES_INICIAL)
criarGradeHTML(MATRIZ_GRADE);
criarSeletorImagemHTML()
criarSeletorTipoGradeHTML()
vizualizarGrade()

export const iniciar = () => {
    VELOCIDADE = calcularVelocidadeGeracoes();

    setTimeout(()=>{
        if (!RODANDO) {return;}
        
        jogoDaVida(MATRIZ_GRADE)

        iniciar()
    }, VELOCIDADE)
}

iniciar()