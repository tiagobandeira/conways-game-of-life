//import { fabButtonClickHandler } from "./fabButtonHandler.js";


var btn = document.querySelector(".btn-fab");
var overlay = document.querySelector(".overlay-btn-fab");

btn.addEventListener("click", (e)=>{fabButtonClickHandler()})
overlay.addEventListener("click", (e)=>{fabButtonClickHandler()})