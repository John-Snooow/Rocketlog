import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/middlewares/utils/AppError";
import { hash } from "bcryptjs";
import { z } from "zod";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({where: {email}});

    if (userWithSameEmail) {
        throw new AppError("User with same email already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return response.json(user);
  }
}

export { UsersController };
