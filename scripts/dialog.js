//import { dialogButtonClickApplyHandler } from "./dialogButtonApplyHandler.js";


document.getElementById("btn-grid-options").addEventListener("click", ()=>{
    document.querySelector(".dialog").classList.toggle("active");
})

document.getElementById("btn-close-dialog").addEventListener("click",()=>{
    document.querySelector(".dialog").classList.remove("active");
})
document.getElementById("btn-apply-dialog").addEventListener("click",()=>{
    document.querySelector(".dialog").classList.remove("active");
    let inputWidthGrid = document.getElementById("input-grid-width");
    let inputHeightGrid = document.getElementById("input-grid-height");
    let gridType = document.getElementById("grid-type");
    let gridVisibility = document.getElementById("grid-visibility");

    const data = {
        gridWidth: inputWidthGrid.value || 15,
        gridHeight: inputHeightGrid.value || 15,
        gridType: gridType.value || "circular",
        gridIsVisible: gridVisibility.checked
    }

    dialogButtonClickApplyHandler(data)
})