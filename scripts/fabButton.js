//import { fabButtonClickHandler } from "./fabButtonHandler.js";


var btn = document.querySelector(".btn-fab");
var overlay = document.querySelector(".overlay-btn-fab");
window.addEventListener("DOMContentLoaded",()=>{
    btn.style.display = "block";
    setTimeout(() => {
        btn.style.scale = "1";
    }, 100);
})
btn.addEventListener("click", (e)=>{fabButtonClickHandler()})
overlay.addEventListener("click", (e)=>{fabButtonClickHandler()})