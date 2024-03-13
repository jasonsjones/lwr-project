-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAuthData" (
    "id" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserAuthData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OauthProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userAuthDataId" TEXT NOT NULL,

    CONSTRAINT "OauthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthData_userId_key" ON "UserAuthData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OauthProvider_userAuthDataId_key" ON "OauthProvider"("userAuthDataId");

-- AddForeignKey
ALTER TABLE "UserAuthData" ADD CONSTRAINT "UserAuthData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OauthProvider" ADD CONSTRAINT "OauthProvider_userAuthDataId_fkey" FOREIGN KEY ("userAuthDataId") REFERENCES "UserAuthData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
