/*
  Warnings:

  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FormToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Field";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Form";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FormToProduct";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OptionSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "nickname" TEXT,
    "description" TEXT,
    "inCartName" TEXT
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cartName" TEXT,
    "optionSetId" TEXT NOT NULL,
    CONSTRAINT "Option_optionSetId_fkey" FOREIGN KEY ("optionSetId") REFERENCES "OptionSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OptionValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "addOnPrice" REAL,
    "defaultValue" BOOLEAN NOT NULL DEFAULT false,
    "optionId" TEXT NOT NULL,
    CONSTRAINT "OptionValue_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OptionSetToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OptionSetToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "OptionSet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OptionSetToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_OptionSetToProduct_AB_unique" ON "_OptionSetToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OptionSetToProduct_B_index" ON "_OptionSetToProduct"("B");
