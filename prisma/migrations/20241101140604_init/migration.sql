-- CreateTable
CREATE TABLE "foods" (
    "id" SERIAL NOT NULL,
    "foodName" TEXT NOT NULL,
    "fat" TEXT NOT NULL,
    "protein" TEXT NOT NULL,
    "carbohydrate" TEXT NOT NULL,
    "calories" TEXT NOT NULL,
    "weight" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calculation_results" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodName" TEXT NOT NULL,
    "fat" TEXT,
    "protein" TEXT,
    "carbohydrate" TEXT,
    "calories" TEXT,
    "weight" TEXT NOT NULL,

    CONSTRAINT "calculation_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calculation_results" ADD CONSTRAINT "calculation_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
