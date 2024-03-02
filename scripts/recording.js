import { fabButtonClickHandler } from "./fabButtonHandler.js";
import { obterAlturaMatriz, obterLarguraMatriz } from "./gameOfLife.js";
import { alert } from "./alert.js";

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
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    downloadVideo(blob, "MeuVideoDoJogoDaVida");
  };

  mediaRecorder.start();
  IDInterval = setInterval(updateCanvas, 50, ctx, canvas);
};


const stopRecording = () => {
  if (!mediaRecorder) {
    return
  }
  mediaRecorder.stop()
  clearInterval(IDInterval)
}

function createVideoDownloadLink(blob, outputFileName = "output.webm") {

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = outputFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  alert("Vídeo salvo com sucesso!")
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

async function downloadVideo(blob, fileNameOutput) {
  try {
    // converte o vídeo para formato mp4
    const { createFFmpeg } = window.FFmpeg;

    const ffmpeg = createFFmpeg({
      log: true,
      corePath: 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js'
    });

    await ffmpeg.load();

    ffmpeg.FS('writeFile', 'input.webm', await fetchFile(blob));

    await ffmpeg.run('-i', 'input.webm', 'output.mp4');

    const data = ffmpeg.FS('readFile', 'output.mp4');

    const newBlob = new Blob([data.buffer], { type: 'video/mp4' });
    createVideoDownloadLink(newBlob, fileNameOutput + ".mp4")
  } catch (error) {
    console.log("Erro ao converter o vídeo: ", error)
    createVideoDownloadLink(blob, fileNameOutput + ".webm")
  }

}

function fetchFile(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(new Uint8Array(this.result));
    };
    reader.readAsArrayBuffer(blob);
  });
}

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
  stopRecording()
  fabButton.disabled = false;
})