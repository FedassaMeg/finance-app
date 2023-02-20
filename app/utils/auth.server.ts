import { json } from "@remix-run/node";
import prisma from "../lib/db.server";
import type { RegisterForm } from "./types.server";

export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({
    where: {
      email: user.email,
    },
  });

  if (exists) {
    return json({ error: "Account exists with that email" }, { status: 400 });
  }
}
