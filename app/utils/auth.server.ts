import { json } from "@remix-run/node";
import prisma from "../lib/db.server";
import type { RegisterForm } from "./types.server";
import { createUserAccount } from "./user.server";

export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({
    where: {
      email: user.email,
    },
  });

  if (exists) {
    return json({ error: "Account exists with that email" }, { status: 400 });
  }

  const account = createUserAccount(user);
  if (!account) {
    return json(
      {
        error: "Something went wrong trying yo create a new user.",
        fields: { email: user.email, password: user.password },
      },
      {
        status: 400,
      }
    );
  }
}
