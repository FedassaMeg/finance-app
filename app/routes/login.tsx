import React, { useState } from "react";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  return (
    <Layout>
      <div className="h-full justify-center items-center flex flex-col gap-y-4">
        <h2 className="text-5xl font-extrabold">Finance App</h2>
        <p className="font-semibold text-slate-300">Login</p>

        <form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
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
            <input
              type="submit"
              className="rounded-xl mt-2 px-3 py-2 font-semibold transition duration-300 ease-in-out hover:-translate-y-1"
              value="Sign In"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
