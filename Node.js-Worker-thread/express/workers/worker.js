import { parentPort } from "worker_threads";

function doCalculation() {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) {
        sum += i;
    }
    return sum;
}

parentPort.postMessage(doCalculation());