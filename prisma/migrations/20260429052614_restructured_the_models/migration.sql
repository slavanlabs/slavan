/*
  Warnings:

  - The values [AGENCY_OWNER,MEMBER] on the enum `UserType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `projectId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transaction` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,6)` to `Integer`.
  - You are about to drop the `agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agency_invite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_member` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[circleId]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `circleId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'UNPAID', 'OVERDUE', 'SCHEDULED', 'VOIDED', 'PARTIALLY_PAID');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('SETTLED', 'FAILED', 'PENDING');

-- AlterEnum
BEGIN;
CREATE TYPE "UserType_new" AS ENUM ('ORG_OWNER');
ALTER TABLE "public"."user" ALTER COLUMN "userType" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "userType" TYPE "UserType_new" USING ("userType"::text::"UserType_new");
ALTER TYPE "UserType" RENAME TO "UserType_old";
ALTER TYPE "UserType_new" RENAME TO "UserType";
DROP TYPE "public"."UserType_old";
ALTER TABLE "user" ALTER COLUMN "userType" SET DEFAULT 'ORG_OWNER';
COMMIT;

-- DropForeignKey
ALTER TABLE "agency" DROP CONSTRAINT "agency_userId_fkey";

-- DropForeignKey
ALTER TABLE "agency_invite" DROP CONSTRAINT "agency_invite_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "agency_invite" DROP CONSTRAINT "agency_invite_invitedById_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_userId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "project_member" DROP CONSTRAINT "project_member_memberId_fkey";

-- DropForeignKey
ALTER TABLE "project_member" DROP CONSTRAINT "project_member_projectId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_projectId_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "projectId",
DROP COLUMN "type",
ADD COLUMN     "circleId" TEXT NOT NULL,
ADD COLUMN     "invoiceId" TEXT NOT NULL,
ADD COLUMN     "settledAt" TIMESTAMP(3),
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "userType" SET DEFAULT 'ORG_OWNER';

-- DropTable
DROP TABLE "agency";

-- DropTable
DROP TABLE "agency_invite";

-- DropTable
DROP TABLE "member";

-- DropTable
DROP TABLE "project";

-- DropTable
DROP TABLE "project_member";

-- DropEnum
DROP TYPE "InviteStatus";

-- DropEnum
DROP TYPE "PayoutStatus";

-- DropEnum
DROP TYPE "ProjectStatus";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationType" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "agreedToTerms" BOOLEAN NOT NULL DEFAULT false,
    "agreedAt" TIMESTAMP(3),
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
    "currency" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "tax" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "taxPercentage" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_userId_key" ON "organization"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_circleId_key" ON "transaction"("circleId");

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
