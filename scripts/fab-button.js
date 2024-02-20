

// Lógica

function active(){ return; }

function desable(){ return; }

// Script Button FAB

export function  hendlerBtnFABClick(callbackActive=active,callbackDesable=desable) {
    
    var btnFAB = document.querySelector(".btn-fab");
    var icon = document.querySelector(".btn-icon");
    var overlay = document.querySelector(".overlay-btn-fab");
    var btnFABGroup = document.querySelector(".btn-fab-group");
    
    overlay.classList.toggle("active")
    btnFABGroup.classList.toggle("active")

    var toggle = btnFAB.classList.toggle("active");

    if (!toggle) {
        btnFAB.classList.add("desactive")
        btnFABGroup.classList.add("desactive")
        callbackDesable()
    }else{
        btnFABGroup.classList.remove("desactive")
        btnFAB.classList.remove("desactive")
        callbackActive()
    }

    setTimeout(()=>{
        icon.classList.toggle("fa-plus");
        btnFABGroup.classList.remove("desactive");
    },100)
}
