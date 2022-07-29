import { readFileSync } from "fs";
import { envs } from "./envs/index";
import loggerConfig from "./logger/index";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));
import { resolvers } from "@generated/type-graphql";

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  graphql: {
    default: {
      path: "/graphql",
      //resolvers: resolvers as any,
      buildSchemaOptions: {
      }
    }
  },
  // additional shared configuration
};
