/*
    Alert Script
*/

export function alert(message, durationInSeconds=5, parentElementSelector="content") {

    let exit = false;
    let alertString = (
        `<div class="snackbar">
            <label class="message" for="">${message}</label>
            <button class="close"><i class="fa-solid fa-close"></i></button>
        </div>`
    );
    
    // Adicionar alertContainer no elemento pai
    let parentElement = document.getElementById(parentElementSelector);
    let alertContainer = document.querySelector(".alert-content");
    
    if (!alertContainer) {
        parentElement.insertAdjacentHTML("afterbegin", '<div class="alert-content"></div>')
        alertContainer = document.querySelector(".alert-content");
    }

    // Inserir alert dentro de alertContainer
    alertContainer.insertAdjacentHTML("afterbegin", alertString);

    // Buscar alert adicionado
    let alertElement = document.querySelector(".snackbar");
    let alertElementCloseButton = document.querySelector(".close");

    // Adiciona evento de clique no botão close
    alertElementCloseButton.addEventListener("click",()=>{
        if (exit) { return; }
        removeAlert(parentElement, alertContainer, alertElement)
        exit = true;
    })

    // ativa o alerta
    activeAlert(alertElement)

    // Criar loop para monitorar a duração do alert
    let durationInMilliseconds = durationInSeconds*1000
    let loopInterval = 100;

    (function alertLoop(currentTime) {
        setTimeout(()=>{
            // interrompe o loop caso o usuário tenha clicado em close
            if (exit) {return;}
            
            // verifica se o tempo do alerta acabou
            if (durationInMilliseconds < currentTime) {
                removeAlert(parentElement ,alertContainer, alertElement)
                exit = true
                return;
            }
            alertLoop(currentTime+loopInterval)
        }, loopInterval);

    })(0);

}


function activeAlert(alertElement) {
    setTimeout(()=>{
        alertElement.classList.add("active")
    },100);
}


function removeAlert(parentElement, alertContainer, alertElement) {
    alertElement.classList.remove("active")
    setTimeout(()=>{
        alertContainer.removeChild(alertElement)
        removeAlertContainer(parentElement, alertContainer)
    }, 200);
}


function removeAlertContainer(parentElement, alertContainer) {
    if (alertContainerHasChildren(alertContainer)) {
        return;
    }
    parentElement.removeChild(alertContainer)
}


function alertContainerHasChildren(alertContainer) {
    if (parseInt(alertContainer.childElementCount) == 0) {
        return false
    }
    return true
}
