import { hendlerBtnFABClick } from "./fab-button.js";


var btn = document.querySelector(".btn-fab");
var overlay = document.querySelector(".overlay-btn-fab");

btn.addEventListener("click", (e)=>{hendlerBtnFABClick()})
overlay.addEventListener("click", (e)=>{hendlerBtnFABClick()})