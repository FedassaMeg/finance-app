import { Link, useLoaderData } from "@remix-run/react";
import prisma from "../../lib/db.server";

export const loader = async () => {
  const data = {
    loans: await prisma.loan.findMany(),
  };

  return data;
};

export default function Loans() {
  const { loans } = useLoaderData();

  return (
    <div className="p-4">
      <h3>Loans</h3>
      <Link to="/loans/calculator">Loan Calculator</Link>
      <h3>Add New Loan</h3>
      <Link to="/loans/new">New Loan</Link>
      <h3>Loan Accounts</h3>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            <span>{loan.name}</span>
            <span>{loan.principalAmount}</span>
            <span>{loan.interestRate}</span>
            <span>{loan.term}</span>
            <span>{loan.startDate}</span>
            <span>{loan.endDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
