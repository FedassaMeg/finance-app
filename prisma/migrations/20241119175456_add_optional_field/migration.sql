-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "balance" REAL,
    "userId" INTEGER,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("balance", "id", "name", "type", "userId") SELECT "balance", "id", "name", "type", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER,
    "amount" REAL NOT NULL,
    "startDate" TEXT,
    "endDate" TEXT,
    "userId" INTEGER,
    CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Budget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("amount", "categoryId", "endDate", "id", "startDate", "userId") SELECT "amount", "categoryId", "endDate", "id", "startDate", "userId" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT
);
INSERT INTO "new_Category" ("id", "name", "type") SELECT "id", "name", "type" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_Investment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "purchaseDate" DATETIME,
    "purchasePrice" REAL,
    "quantity" REAL,
    "currentMarketValue" REAL,
    "userId" INTEGER,
    CONSTRAINT "Investment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Investment" ("currentMarketValue", "id", "name", "purchaseDate", "purchasePrice", "quantity", "type", "userId") SELECT "currentMarketValue", "id", "name", "purchaseDate", "purchasePrice", "quantity", "type", "userId" FROM "Investment";
DROP TABLE "Investment";
ALTER TABLE "new_Investment" RENAME TO "Investment";
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "principalAmount" REAL,
    "interestRate" REAL,
    "term" INTEGER,
    "startDate" TEXT,
    "endDate" TEXT,
    "userId" INTEGER,
    CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("endDate", "id", "interestRate", "name", "principalAmount", "startDate", "term", "userId") SELECT "endDate", "id", "interestRate", "name", "principalAmount", "startDate", "term", "userId" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "description" TEXT,
    "amount" REAL NOT NULL,
    "status" TEXT,
    "userId" INTEGER,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "date", "description", "id", "status", "userId") SELECT "amount", "date", "description", "id", "status", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_TransactionLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "debitAccountId" INTEGER,
    "creditAccountId" INTEGER,
    "transactionId" INTEGER,
    "amount" REAL NOT NULL,
    CONSTRAINT "TransactionLine_debitAccountId_fkey" FOREIGN KEY ("debitAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TransactionLine_creditAccountId_fkey" FOREIGN KEY ("creditAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "TransactionLine_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TransactionLine" ("amount", "creditAccountId", "debitAccountId", "id", "transactionId") SELECT "amount", "creditAccountId", "debitAccountId", "id", "transactionId" FROM "TransactionLine";
DROP TABLE "TransactionLine";
ALTER TABLE "new_TransactionLine" RENAME TO "TransactionLine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
