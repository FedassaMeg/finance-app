import { Link } from "@remix-run/react";

export default function Expense() {
  return (
    <div className="p-4">
      <h3>Expense</h3>
      <Link to="/expenses/tracker">
        Tracker
      </Link>
      <Link to="/expenses/new">
        Add New Expense
      </Link>
    </div>
  );
}
