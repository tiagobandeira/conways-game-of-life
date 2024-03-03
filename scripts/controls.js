//import * as controles from "./gameOfLife.js";


// Configurações

document.getElementById("seletorImagem").addEventListener("change",()=>{
    selecionarImagemHTML()
})

document.getElementById("seletorTipoGrade").addEventListener("change",()=>{
    selecionarTipoGradeHTML()
})


document.getElementById("chequeExibirGrade").addEventListener("change",()=>{
    vizualizarGrade()
})


// Controles

document.getElementById("btn-rodar").addEventListener("click",()=>{
    rodar()
})

document.getElementById("btn-pausar").addEventListener("click",()=>{
    pausar()
})

document.getElementById("btn-reiniciar").addEventListener("click",()=>{
    reiniciar()
})

document.getElementById("btn-limpar").addEventListener("click",()=>{
    limpar()
})

document.getElementById("intervaloVelocidade").addEventListener("change",()=>{
    mudarVelocidade()
})


document.getElementById("btn-diminuir-zoom").addEventListener("click",()=>{
    diminuirZoom()
})

document.getElementById("btn-aumentar-zoom").addEventListener("click",()=>{
    aumentarZoom()
})





