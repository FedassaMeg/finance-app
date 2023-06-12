import React, { useState, useRef, useEffect, useReducer } from "react";
import { useActionData } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validators.server";
import { getUser, login, register } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: "Invalid Form Data", form: action }, { status: 400 });
  }

  if (
    action === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return json({ error: "Invalid Form Data", form: action }, { status: 400 });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
        }
      : {}),
  };

  if (Object.values(errors).some(Boolean))
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    );

  if (action === "login") {
    return await login({ email, password });
  } else if (action === "register") {
    return await register({ email, password, firstName, lastName });
  } else {
    return json({ error: "Invalid Form Data" }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData();
  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    firstName: actionData?.fields?.firstName || "",
    lastName: actionData?.fields?.lastName || "",
  });

  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [action]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAction(action === "login" ? "register" : "login");
  };

  return (
    <Layout>
      <div className="h-full justify-center items-center flex flex-col gap-y-4">
        <h2 className="text-5xl font-extrabold">Finance App</h2>
        <p className="font-semibold text-slate-300">
          {action === "login" ? "Log In" : "Sign Up"}
        </p>

        <form method="POST" className="rounded-2xl bg-gray-200 p-6 w-96">
          <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">{formError}</div>
          {action === "register" && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={handleInputChange}
                value={formData.firstName}
                error={errors?.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={handleInputChange}
                value={formData.lastName}
                error={errors?.lastName}
              />
            </>
          )}
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors?.email}
          />
          <FormField
            htmlFor="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors?.password}
          />
          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className="rounded-xl mt-2 px-3 py-2 font-semibold transition duration-300 ease-in-out hover:-translate-y-1"
            >
              {action === "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <div className="w-full text-center">
            <button
              className="rounded-xl mt-2 px-3 py-2 font-semibold"
              onClick={handleActionClick}
            >
              {action === "login" ? "Create Account" : "Go to Login"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
