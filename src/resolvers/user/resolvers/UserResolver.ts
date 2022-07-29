import { Returns } from "@tsed/schema";
import { ResolverService } from "@tsed/typegraphql";
import { Query, Arg, Mutation } from "type-graphql";
import { User, UserInput } from "../models/User";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@ResolverService(User)
export class UserResolver {

      // Crear un usuario
      @Mutation(Returns => User)
      async createUser(@Arg('input') input: UserInput) {
            const newUser = await prisma.user.create({
                  data: {
                        username: input.username
                  }
            });
            console.log(newUser);
            return newUser;
      }

      // Actualizar un usuario
      @Mutation(Returns => User)
      async updateUser(@Arg('id') id: string, @Arg('newUser') newUser: UserInput) {
            const user = await prisma.user.update({
                  where: {
                        id: id
                  },
                  data: {
                        username: newUser.username
                  }
            });
            console.log(user);
            return user;
      }

}