import React, { useState } from "react";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";

export default function Login() {
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAction(action === "login" ? "register" : "login");
  }

  const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  return (
    <Layout>
      <div className="h-full justify-center items-center flex flex-col gap-y-4">
        <h2 className="text-5xl font-extrabold">Finance App</h2>
        <p className="font-semibold text-slate-300">
          {action === "login" ? "Log In" : "Sign Up"}
        </p>

        <form className="rounded-2xl bg-gray-200 p-6 w-96">
          {action === "register" && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={handleInputChange}
                value={formData.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={handleInputChange}
                value={formData.lastName}
              />
            </>
          )}
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormField
            htmlFor="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="w-full text-center">
            <button
              className="rounded-xl mt-2 px-3 py-2 font-semibold transition duration-300 ease-in-out hover:-translate-y-1"
              onClick={handleSubmitClick}
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
