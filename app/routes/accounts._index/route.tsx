import { useLoaderData, Link } from "@remix-run/react";
import prisma from "../../lib/db.server";

// export const loader = async () => {
//   console.log()
//   const data = {
//     accounts: await prisma.account.findMany(),
//   };

//   return data;
// };

export default function Account() {
  // const { accounts } = useLoaderData();
  const accounts = [];
  return (
    <div className="p-4">
      <h3>Account</h3>
      <Link to="/accounts/new">Add New Account</Link>
      <div>
        <span>Show existing accounts</span>
        <ul>
          {accounts.map((account) => (
            <li>
              <span>{account.name}</span>
              <span>{account.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
