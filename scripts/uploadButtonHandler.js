import { validarDados, toJSON } from "./processData.js";
import { alert } from "./alert.js";

export function uploadButtonClickHandler(callback){

    const btnUpload = document.getElementById("btn-upload");
    const inputFile = document.getElementById("inputFile");
    
    
    btnUpload.addEventListener('click', ()=>{
        inputFile.click()
    })
    
    inputFile.addEventListener("change", (e)=>{
        var fileInput = e.target
        var file = fileInput.files[0];
        if(file){
            var reader = new FileReader();
            reader.onload = (event) => {
                var fileContent = event.target.result;
                var data = toJSON(fileContent)

                var content = document.getElementById("content");
                
                if (validarDados(data)) {
                    callback(data)
                    alert(content, "Imagem carregada com sucesso", 3)
                }else{
                    callback()
                    alert(content, "Essa imagem não é válida", 4)
                }
                fileInput.value = ""
            }
            reader.readAsText(file)
    
        }else{
            alert(content, "Nenhum arquivo selecionado", 3)
        }
    })
}




