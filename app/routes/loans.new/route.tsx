import React, { useState } from "react";
import { FormField } from "../../components/form-field";
import prisma from "../../lib/db.server";
import { type ActionFunction, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const principalAmount = formData.get("amount");
  const interestRate = formData.get("rate");
  const term = formData.get("term");
  const startDate = formData.get("start");
  const endDate = formData.get("end");

  if (typeof name !== "string") {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  // Handle errors for other fields

  try {
    const loan = await prisma.loan.create({
      data: {
        name,
        principalAmount: parseInt(principalAmount),
        interestRate: parseInt(interestRate),
        term: parseInt(term),
        startDate,
        endDate,
      },
    });
    return json({ loan });
  } catch (error) {
    return json(
      { error: `Failed to create account: ${error}` },
      { status: 500 }
    );
  }
};

export default function AddNewAccount() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    rate: "",
    term: "",
    start: "",
    end: "",
  });

  console.log(actionData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="h-full w-full justify-center p-4">
      <h3 className="font-semibold text-gray-600">Add New Loan</h3>
      <form method="POST" className="rounded bg-gray-200 p-4">
        <label>
          Loan Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Amount
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Interest Rate
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Term
          <input
            type="number"
            name="term"
            value={formData.term}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Date
          <input
            type="date"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            name="end"
            value={formData.end}
            onChange={handleInputChange}
          />
        </label>
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
