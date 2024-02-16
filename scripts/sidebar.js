var sidebarButton = document.getElementById("sidebar-collapse");

sidebarButton.addEventListener("click",()=>{
    let sidebar = document.getElementById("sidebar")
    sidebar.classList.toggle("active")
    overlay.classList.toggle("active");
})


// swipe sidebar
var sidebar = document.getElementById("sidebar");
var overlay = document.querySelector(".overlay");
var dismiss = document.querySelector("#dismiss");


sidebar.addEventListener("touchstart", capturarInicioMovimentoToque, false);
sidebar.addEventListener("touchmove", capturarMovimentoToque, false);
sidebar.addEventListener("touchend", capturarFimMovimentoToque, false);

var xInicial = null;

function capturarInicioMovimentoToque(e){
    xInicial = e.touches[0].clientX;
}

function capturarFimMovimentoToque(e) {
    if (xInicial != null) {
        sidebar.style.removeProperty("margin-left");
    }
}
function capturarMovimentoToque(e){

    if (e.target.id == "intervaloVelocidade") {
        return;
    }

    if (xInicial === null) {
        return;
    }

    var xAtual = e.touches[0].clientX;

    var diferencaX = parseInt( xInicial - xAtual);

    if (diferencaX > 0) {

        if (diferencaX < 100) {
            sidebar.style.marginLeft = `-${diferencaX}px`;
        }else{
            sidebar.style.marginLeft = "-250px";
            sidebar.classList.toggle("active");
            overlay.classList.toggle("active");
            sidebar.style.removeProperty("margin-left");
            xInicial = null;
           
        }
    }else{
        // Moveu para direita
    }
    e.preventDefault();
}

overlay.addEventListener("click", (e)=>{
    overlay.classList.toggle("active");
    sidebar.classList.toggle("active");
})

dismiss.addEventListener("click",(e)=>{
    sidebar.classList.toggle("active");
    overlay.classList.remove("active")
})
