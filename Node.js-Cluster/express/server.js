import cluster from 'cluster';
import express from 'express';
import os from 'os';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary cluster ${process.pid} is running`);

    // fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const app = express();
    const port = 5000;

    app.get('/', (req, res) => {
        res.json({ message: `Hello from Express! ${process.pid}` });
    });

    app.listen(port, () => {
        console.log(
            `Example app listening at http://localhost:${port} - ${process.pid}`
        );
    });
}

