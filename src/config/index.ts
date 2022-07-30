import { readFileSync } from "fs";
import { envs } from "./envs/index";
import loggerConfig from "./logger/index";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));
import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";

const prisma = new PrismaClient();

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  graphql: {
    default: {
      path: "/graphql",
      resolvers: resolvers as any,
      context: (context: ExpressContext) => {
        return { prisma: prisma, token: context.req.headers.authorization?.split(" ")[1] }; // bearer <token>, // verificar si el token es valido
      },
      buildSchemaOptions: {
      }
    }
  },
  // additional shared configuration
};
