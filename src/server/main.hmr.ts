import { NestFactory, FastifyAdapter } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import * as path from "path";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  app.useStaticAssets({
    root: path.resolve(__dirname + "../../../dist/public")
  });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
