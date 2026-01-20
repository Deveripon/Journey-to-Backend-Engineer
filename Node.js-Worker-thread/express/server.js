import cluster from 'cluster';
import express from 'express';
import { Worker } from "worker_threads";

const INSTANCE_COUNT = 4;

if (cluster.isPrimary) {
    console.log(`Primary cluster ${process.pid} is running`);

    // fork workers
    for (let i = 0; i < INSTANCE_COUNT; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    const app = express();
    const port = 5000;

    app.get('/', (req, res) => {
        res.json({ message: `Hello from Express! ${process.pid}` });
    });

    app.get("/heavy", (req, res) => {
        const worker = new Worker('./workers/worker.js')
        worker.on('message', (data) => {
            res.json({
                message: `heavy computation done by ${process.pid} - and result is ${data}`
            })
        })
        worker.on('error', (error) => {
            console.log(error)
            res.json({
                message: `heavy computation failed by ${process.pid}`
            })
        })
    })



    app.listen(port, () => {
        console.log(
            `Example app listening at http://localhost:${port} - ${process.pid}`
        );
    });
}

