-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "firebaseUid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "images" TEXT[],
    "price" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProduct" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "public"."User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "UserProduct_userId_productId_key" ON "public"."UserProduct"("userId", "productId");

-- AddForeignKey
ALTER TABLE "public"."UserProduct" ADD CONSTRAINT "UserProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProduct" ADD CONSTRAINT "UserProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
