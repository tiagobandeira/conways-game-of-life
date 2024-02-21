import { validarDados, toJSON } from "./processData.js";

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
                
                if (validarDados(data)) {
                    console.log("Dados da imagem são válidos!")
                    callback(data)
                    console.log(data)
                }else{
                    console.log("Os dados da imagem não são válidos!")
                }
                fileInput.value = ""
            }
            reader.readAsText(file)
    
        }else{
            console.log("Nenhum arquivo selecionado")
        }
    })
}




