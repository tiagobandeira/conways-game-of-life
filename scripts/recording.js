import { fabButtonClickHandler } from "./fabButtonHandler.js";
import { obterAlturaMatriz, obterLarguraMatriz } from "./gameOfLife.js";

var mediaRecorder;
var IDInterval;
var cellColor = "#6b9fb8";
const cellSize = 20;



const startRecording = () => {

  const tabelaContainer = document.getElementById('table-container');
  tabelaContainer.insertAdjacentHTML("afterbegin", `
            <canvas id="canvas" 
                    width="${obterLarguraMatriz() * cellSize}" 
                    height="${obterAlturaMatriz() * cellSize}" 
                    style="display: none;">
            </canvas>
    `);

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let recordedChunks = [];

  const stream = canvas.captureStream();
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = () => {
    createVideoBlob(recordedChunks);
  };

  mediaRecorder.start();
  IDInterval = setInterval(updateCanvas, 50, ctx, canvas);
};


const storpRecording = () => {
  if (!mediaRecorder) {
    return
  }
  mediaRecorder.stop()
  clearInterval(IDInterval)
}

function createVideoBlob(recordeData) {
  const blob = new Blob(recordeData, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display:none";
  a.href = url;
  a.download = "imagem-gravada.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}


function updateCanvas(ctx, canvas) {
  const table = document.getElementById('grade');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const tableRows = table.querySelectorAll('tr');
  let y = 0;
  tableRows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    let x = 0;
    cells.forEach((cell) => {
      if (cell.classList.contains('bg-color')) {
        ctx.fillStyle = cellColor;
        ctx.fillRect(x, y, cellSize, cellSize);
      }
      x += cellSize;
    });
    y += cellSize;
  });
};


const startRecordingButton = document.getElementById("btn-start-record");
const stopRecordingButton = document.getElementById("btn-stop-record");
const fabButton = document.querySelector(".btn-fab");

startRecordingButton.addEventListener("click", () => {
  stopRecordingButton.classList.add("active")
  fabButtonClickHandler()
  fabButton.disabled = true;
  startRecording()
})
stopRecordingButton.addEventListener("click", () => {
  stopRecordingButton.classList.remove("active")
  storpRecording()
  fabButton.disabled = false;
})