import { NestFactory } from '@nestjs/core';
import cluster from 'cluster';
import os from 'os';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: ${await app.getUrl()} - process id ${process.pid}`,
  );
}

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary cluster ${process.pid} running - ${process.pid} `);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  bootstrap();
}
