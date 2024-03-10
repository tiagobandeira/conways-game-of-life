var btnLoaders = document.querySelectorAll(".btn-loader")

window.addEventListener("DOMContentLoaded",()=>{
    let btnZoomOut = document.getElementById("btn-diminuir-zoom");
    let btnZoomIn = document.getElementById("btn-aumentar-zoom");
    let btnSidebarCollapse = document.getElementById("sidebar-collapse")

    setTimeout(() => {
        btnLoaders.forEach(btn => {
            btn.classList.remove("btn-loader")
        });

        btnZoomOut.insertAdjacentHTML("afterbegin","<i class='fa-solid fa-magnifying-glass-minus'>");
        btnZoomIn.insertAdjacentHTML("afterbegin","<i class='fa-solid fa-magnifying-glass-plus'>");
        btnSidebarCollapse.insertAdjacentHTML("afterbegin","<i class='fa-solid fa-sliders'>");
       
    }, 400);  
})