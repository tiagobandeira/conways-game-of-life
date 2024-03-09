var loaderGroup = document.querySelector(".loader-group")
var loaders = document.querySelectorAll(".loader")
var btns = document.querySelectorAll(".btn")
window.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {
        // loaderGroup.remove()
    loaders.forEach(loader => {
        loader.classList.remove("loader")
    });
    btns.forEach(btn=>{
        btn.style.display = "block";
    })
    }, 1000);
    
})