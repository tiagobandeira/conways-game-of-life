var btnLoaders = document.querySelectorAll(".btn-loader")

window.addEventListener("DOMContentLoaded",()=>{

    setTimeout(() => {
        btnLoaders.forEach(btn => {
            btn.style.display = "block";
        });
    }, 100);  
})