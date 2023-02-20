import { redirect, json, createCookieSessionStorage } from "@remix-run/node";
import bcrypt from "bcryptjs";
import prisma from "../lib/db.server";
import type { LoginForm, RegisterForm } from "./types.server";
import { createUserAccount } from "./user.server";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set!");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "finance-app-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

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

  return createUserSession((await account).id, "/");
}

export async function login({ email, password }: LoginForm) {
  const account = await prisma.user.findUnique({
    where: { email },
  });

  if (!account || !(await bcrypt.compare(password, user.password)))
    return json({ error: "Incorrect login" }, { status: 400 });

  return createUserSession(account.id, "/");
}
