import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { BeforeRoutesInit, PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/typegraphql";
import "./datasources/index";
import "./resolvers/index";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import { resolvers } from "@generated/type-graphql";
import { any } from "@tsed/schema";
import { validate } from "class-validator";
import "@tsed/platform-express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";




// TODO: Descomentar esto y borrar la configuracion que ya realice
@Configuration({
  /*typegraphql: {
    server1: {
      path: '/grahpql',
      resolvers: resolvers as any,
      validate: false

    } as any
  },
 */
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/rest": [
      ...Object.values(rest)
    ]
  },
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    })
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
//TODO: union con apollo server
export class Server {
  /*async $beforeRoutesInit(): Promise<any> {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: resolvers,
        validate: false
      }),
      playground: true,
    });
    await server.start();
    server.applyMiddleware({ app: this.app.raw, path: '/' });
  }
  */

  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
