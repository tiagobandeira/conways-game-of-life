var btnLoaders = document.querySelectorAll(".btn-loader")
var icons = document.querySelectorAll(".fa-solid")
var iconGrid = document.querySelector(".icon-grid")
window.addEventListener("DOMContentLoaded",()=>{
    btnLoaders.forEach(btn => {
        btn.style.display = "block";
    });
    iconGrid.style.display = "block";
    setTimeout(() => {
        icons.forEach(icon => {
            icon.style.scale = "1";
        });
        iconGrid.style.scale = "1";
       
    }, 100);  
})