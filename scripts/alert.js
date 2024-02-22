/*
    Alert Script
*/

export function alert(parentElement, message, durationInSeconds) {
    if (!parentElement) {
        parentElement = document.body
    }

    let alertString = `
        <div class="snackbar">
            <label class="message" for="">${message}</label>
            <button class="close"><i class="fa-solid fa-close"></i></button>
        </div>
    `;
    let exit = false;

    // insere o alerta no elemento pai
    parentElement.insertAdjacentHTML("beforeend", alertString);
    
    // busca o alerta adicionado
    let alertElement = document.querySelector(".snackbar");
    let alertElementCloseButton = document.querySelector(".close");

    // adiciona onclick no botão close
    alertElementCloseButton.addEventListener("click",()=>{
        if (exit) { return; }
        removeAlert(parentElement, alertElement)
        exit = true;
    })

    // ativa o alerta
    activeAlert(alertElement)

    // cria um loop para monitorar o a duração do alerta 
    let durationInMilliseconds = durationInSeconds*1000
    let loopInterval = 100;

    (function alertLoop(t) {
        setTimeout(()=>{
            // interrompe o loop caso o usuário tenha clicado em close
            if (exit) {return;}
            
            // verifica se o tempo do alerta acabou
            if (durationInMilliseconds < t) {
                removeAlert(parentElement, alertElement)
                exit = true
                return;
            }
            alertLoop(t+loopInterval)
        }, loopInterval);

    })(0);

}


function activeAlert(alertElement) {
    setTimeout(()=>{
        alertElement.classList.add("active")
    },100);
}


function removeAlert(parentElement, alertElement) {

    alertElement.classList.remove("active")
    setTimeout(()=>{
        parentElement.removeChild(alertElement)
    }, 200);
}