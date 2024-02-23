import { fabButtonClickHandler } from "./fabButtonHandler.js";
import { alert } from "./alert.js";


export function downloadButtonClickHandler(objectImage) {
    if (!objectImage) {
        return;
    }
    const nameFile = objectImage.nomeImagem + ".json";
    download(objectImage,  nameFile)
}


function download(object, filename) {
    // Converter objeto para string JSON
    const jsonString = JSON.stringify(object);
    
    // Criar blob a partir da string JSON
    const myBlob = new Blob([jsonString], {type: 'application/json'});
    
    // Criar link de download
    const link = window.document.createElement('a');
    link.href = window.URL.createObjectURL(myBlob);
    link.download = filename;
    link.click()

    // Revogar a URL do objeto após o download
    window.URL.revokeObjectURL(link.href);

    // Desativar o Botão FAB
    fabButtonClickHandler();

    // Exibir alerta
    alert("A Imagem foi salva com sucesso!")
}