import prisma from "../../lib/db.server";

async function getLoaderData(accountId: number) {
  const account = await prisma.account.findUnique({
    where: {
      id: accountId,
    },
    include: { transactions: true },
  });

  return account;
}

export default getLoaderData;
