const startWorkerButton = document.getElementById("startWorker");
const changeColorButton = document.getElementById("changeColor");

const worker = new Worker('worker.js')
startWorkerButton.addEventListener("click", () => {
    worker.postMessage('start')
})
worker.onmessage = (message) => {
    console.log(`Total Result: ${message.data}`);
}

changeColorButton.addEventListener("click", () => {
    if (document.body.style.backgroundColor !== "blue") {
        document.body.style.backgroundColor = "blue";
    } else {
        document.body.style.backgroundColor = "white";
    }
})