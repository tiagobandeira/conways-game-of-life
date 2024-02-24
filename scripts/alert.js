/*
    Alert Script
*/

export function alert(message, durationInSeconds=5, parentElementSelector="content") {

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
        removeAlert(parentElement, alertContainer, alertElement)
    })

    // ativa o alerta
    waitForTheAnimation(()=>{
        alertElement.classList.add("active")
    })

    // Criar setInterval para monitorar a duração do alert
    let durationInMilliseconds = durationInSeconds*1000

    const interval = setInterval(
        removeAlert,
        durationInMilliseconds,
        parentElement,
        alertContainer,
        alertElement
    );
}


function removeAlert(parentElement, alertContainer, alertElement) {
    if (alertContainer.contains(alertElement)) {
        alertElement.classList.remove("active")
        waitForTheAnimation(()=>{
            alertContainer.removeChild(alertElement)
            removeAlertContainer(parentElement, alertContainer)
        });
    }
}

function removeAlertContainer(parentElement, alertContainer) {
    if (alertContainerHasChildren(alertContainer)) {
        return;
    }
    if (!parentElement.contains(alertContainer)) {
        return;
    }
    parentElement.removeChild(alertContainer)
}


function alertContainerHasChildren(alertContainer) {
    if (alertContainer.childElementCount == 0) {
        return false
    }
    return true
}

function waitForTheAnimation(callback) {
    setTimeout(callback, 200)
}