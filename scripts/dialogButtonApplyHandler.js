import { reiniciar, vizualizarGrade, selecionarTipoGradeHTML,reiniciarGradeHTML,obterTodasPosicoesCelulasVivas } from "./gameOfLife.js";
import { alert } from "./alert.js";
export function dialogButtonClickApplyHandler(data) {
    if (!data) {
        return;
    }    
    vizualizarGrade(data.gridIsVisible)
    selecionarTipoGradeHTML(data.gridType)
    if (data.gridWidth <= 100 && data.gridHeight <= 100) {
        reiniciarGradeHTML(parseInt(data.gridWidth),parseInt(data.gridHeight),obterTodasPosicoesCelulasVivas())
    }else{
        alert("Ops! A área máxima da grade é 100x100")
    }
}