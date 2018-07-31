import { NestFactory, FastifyAdapter } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsAdapter } from '@nestjs/websockets/adapters';

import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app.enableCors();
  // app.setGlobalPrefix('api');
 /* app.useStaticAssets({
    root: path.resolve(__dirname + "../../../dist/public")
  });*/
  app.useWebSocketAdapter(new WsAdapter());
  await app.listen(AppModule.PORT);
}
bootstrap();