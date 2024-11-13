import { Link } from "@remix-run/react";

export default function Loans() {
  return (
    <div className="p-4">
      <h3>Loans</h3>
      <Link to="/loans/calculator">Loan Calculator</Link>
      <h3>Loan Accounts</h3>
    </div>
  );
}
