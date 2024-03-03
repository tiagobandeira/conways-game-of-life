// import { toJSON, validateData } from "./processData.js";
// import { alert } from "./alert.js";

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
                
                if (validateData(data)) {
                    callback(data)
                    alert("Imagem carregada com sucesso")
                }else{
                    callback()
                    alert("Essa imagem não é válida")
                }
                fileInput.value = ""
            }
            reader.readAsText(file)
    
        }else{
            alert("Nenhum arquivo selecionado")
        }
    })
}




