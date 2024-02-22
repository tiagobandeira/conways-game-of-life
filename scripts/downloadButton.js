import { downloadButtonClickHandler } from "./downloadButtonHandler.js";
import { obterTodasPosicoesCelulasVivas } from "./gameOfLife.js";

const btnDownload = document.getElementById("btn-dowload");
btnDownload.addEventListener("click",()=>{

    var seletorTipoGrade = document.getElementById("seletorTipoGrade");
    var intervaloVelocidade = document.getElementById("intervaloVelocidade");
    var chequeExibirGrade = document.getElementById("chequeExibirGrade");

    const imagem = {
        tipoGrade: seletorTipoGrade.value,
        nomeImagem: "MinhaImagemDoJogoDaVida",
        velocidade: parseInt(intervaloVelocidade.value),
        exibirGrade: chequeExibirGrade.checked,
        posicoesImagem: obterTodasPosicoesCelulasVivas()
    };
    downloadButtonClickHandler(imagem)
})