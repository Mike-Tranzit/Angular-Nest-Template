import { NestFactory, FastifyAdapter } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  app.useStaticAssets({
    root: path.resolve(__dirname + "../../../dist/public")
  });

  await app.listen(3000);
}
bootstrap();
