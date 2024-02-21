import * as controles from "./gameOfLife.js";


// Configurações

document.getElementById("seletorImagem").addEventListener("change",()=>{
    controles.selecionarImagemHTML()
})

document.getElementById("seletorTipoGrade").addEventListener("change",()=>{
    controles.selecionarTipoGradeHTML()
})


document.getElementById("chequeExibirGrade").addEventListener("change",()=>{
    controles.vizualizarGrade()
})


// Controles

document.getElementById("btn-rodar").addEventListener("click",()=>{
    controles.rodar()
})

document.getElementById("btn-pausar").addEventListener("click",()=>{
    controles.pausar()
})

document.getElementById("btn-reiniciar").addEventListener("click",()=>{
    controles.reiniciar()
})

document.getElementById("btn-limpar").addEventListener("click",()=>{
    controles.limpar()
})

document.getElementById("intervaloVelocidade").addEventListener("change",()=>{
    controles.mudarVelocidade()
})


document.getElementById("btn-diminuir-zoom").addEventListener("click",()=>{
    controles.diminuirZoom()
})

document.getElementById("btn-aumentar-zoom").addEventListener("click",()=>{
    controles.aumentarZoom()
})





