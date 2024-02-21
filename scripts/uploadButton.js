import { uploadButtonClickHandler } from "./uploadButtonHandler.js";
import { reiniciar, selecionarTipoGradeHTML, vizualizarGrade, calcularVelocidadeGeracoes } from "./gameOfLife.js";
import { fabButtonClickHandler } from "./fabButtonHandler.js";

function populateTheTemplate(data){
    vizualizarGrade(data.exibirGrade)
    selecionarTipoGradeHTML(data.tipoGrade)
    calcularVelocidadeGeracoes(data.velocidade)
    reiniciar(data.posicoesImagem)
    fabButtonClickHandler()
}
uploadButtonClickHandler(populateTheTemplate)