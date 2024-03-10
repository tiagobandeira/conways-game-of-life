var btnLoaders = document.querySelectorAll(".btn-loader")

window.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {
        btnLoaders.forEach(btn => {
            btn.classList.remove("btn-loader")
        });
       
    }, 400);  
})