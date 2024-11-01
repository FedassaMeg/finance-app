import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import prisma from "../../../lib/db.server";

async function getLoaderData(accountId: number) {
  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
    include: { transactions: true },
  });

  return account;
}

export const loader = async ({ params }: LoaderArgs) => {
  const id = parseInt(params.accountId, 10);

  const data = {
    account: await getLoaderData(id),
  };

  return data;
};

export default function AccountDetails() {
  const { account } = useLoaderData<typeof loader>();
  return (
    <div>
      <h3>Account Details for {account.name}</h3>
      <div>
        <div>
          <span>Account Name:</span>
          <span>{account.name}</span>
        </div>
        <div>
          <span>Account Type:</span>
          <span>{account.type}</span>
        </div>
        <div>
          <span>Date Added:</span>
          <span>{account.createdAt}</span>
        </div>
        <div>
          <span>Last Updated:</span>
          <span>{account.updatedAt}</span>
        </div>
        <div>
          <span>Transactions</span>
          <ul>
            {account.transactions.map((transaction) => (
              <li>
                <span>{transaction.label}</span>
                <span>{transaction.type}</span>
                <span>${transaction.amount}</span>
                <span>{transaction.updatedAt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
