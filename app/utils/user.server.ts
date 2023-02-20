import bcrypt from "bcryptjs";
import type { RegisterForm } from "./types.server";
import prisma from "~/lib/db.server";

export const createUserAccount = async (user: RegisterForm) => {
    const hash = await bcrypt.hash(user.password, 10)
    const account = await prisma.user.create({
        data: {
            email: user.email,
            password: hash,
            firstName: user.firstName,
            lastName: user.lastName
        }
    })

    return { id: account.id, email: user.email }
}