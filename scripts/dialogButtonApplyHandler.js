import { vizualizarGrade, selecionarTipoGradeHTML,reiniciarGradeHTML,obterTodasPosicoesCelulasVivas } from "./gameOfLife.js";
import { alert } from "./alert.js";


export function dialogButtonClickApplyHandler(data) {
    if (!data) {
        return;
    }    

    let width = parseInt(data.gridWidth);
    let height = parseInt(data.gridHeight);

    let dimensoesInvalidas  = (
        height < 1   || height > 100 ||
        width  > 100 || width  < 1  
    )

    if (dimensoesInvalidas) {
        alert("Ops! Dimensões fora do intervalo permitido(1 a 100 células em cada lado)");
        return;
    }

    vizualizarGrade(data.gridIsVisible)
    selecionarTipoGradeHTML(data.gridType)
    reiniciarGradeHTML(width, height, obterTodasPosicoesCelulasVivas())

}