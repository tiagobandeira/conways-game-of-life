function salvarTema(tema="light"){
    localStorage.setItem("tema",tema);
}

function obterTema(){
    return localStorage.getItem("tema");
}


function escolherTema(tema=""){


    var chequeTema = document.getElementById("chequeTema");
    var textoChequeTema = document.getElementById("textoChequeTema");
    var corpo = document.getElementsByTagName("body")[0];

    if (tema == "") {
        tema = chequeTema.checked == false ? "light":"dark"
    }else{
        chequeTema.checked = tema == "dark" ? true:false
    }


    if (tema == "dark") {
        corpo.classList.add("dark-theme");
    }else{
        corpo.classList.remove("dark-theme");
    }
    
    textoChequeTema.innerText = tema == "dark" ? "Tema Escuro":"Tema Claro"
    document.documentElement.setAttribute("data-bs-theme", tema);

    salvarTema(tema)
}


window.addEventListener("load", (event) => {
    var tema = obterTema();
    if (!tema) {
        var sitemaPrefereTemaDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        tema = sitemaPrefereTemaDark == true ? "dark":"false"
    }
    escolherTema(tema)
});
