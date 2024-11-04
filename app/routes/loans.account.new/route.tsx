import React, { useState } from "react";
import { FormField } from "../../components/form-field";

// export const loader = async (data) => await prisma.transaction.create({
//   data
// })

export default function AddNewAccount() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="h-full justify-center">
      <h3 className="font-semibold text-gray-600">Add New Account</h3>
      <form method="POST" className="rounded bg-gray-200 p-4">
        <FormField
          htmlFor="name"
          label="Account Name"
          onChange={handleInputChange}
          value={formData.name}
          error={errors?.name}
        />
        <FormField
          htmlFor="type"
          label="Account Type"
          onChange={handleInputChange}
          value={formData.type}
          error={errors?.type}
        />
        <button
          type="submit"
          name="_action"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Add Account
        </button>
      </form>
    </div>
  );
}
