import { $log } from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import { Server } from "./Server";
import { PrismaClient } from "@prisma/client";


async function bootstrap() {
  try {
    const platform = await PlatformExpress.bootstrap(Server);
    await platform.listen();

    process.on("SIGINT", () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({ event: "SERVER_BOOTSTRAP_ERROR", message: error.message, stack: error.stack });
  }
}
const prisma = new PrismaClient();

async function main() {
  const task = await prisma.task.create({
    data: {
      title: 'test',
      description: 'Tarea de prueba',
      dateExpiration: false
    }
  });
  console.log(task);
}

bootstrap();
main();