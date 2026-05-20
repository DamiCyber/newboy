-- Align price columns with Prisma BigInt (SQLite INTEGER supports 64-bit values).
-- Existing INTEGER rows are preserved; invalid large values are corrected separately via db:cleanup-prices.

PRAGMA foreign_keys=OFF;

CREATE TABLE "new_House" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pricePerNight" BIGINT NOT NULL,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

INSERT INTO "new_House" (
    "id", "title", "description", "address", "city", "pricePerNight",
    "bedrooms", "bathrooms", "imageUrl", "isActive", "createdAt", "updatedAt"
)
SELECT
    "id", "title", "description", "address", "city", "pricePerNight",
    "bedrooms", "bathrooms", "imageUrl", "isActive", "createdAt", "updatedAt"
FROM "House";

DROP TABLE "House";
ALTER TABLE "new_House" RENAME TO "House";

CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "houseId" INTEGER NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME NOT NULL,
    "totalPrice" BIGINT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "new_Booking" (
    "id", "houseId", "guestName", "guestEmail", "checkIn", "checkOut",
    "totalPrice", "status", "createdAt"
)
SELECT
    "id", "houseId", "guestName", "guestEmail", "checkIn", "checkOut",
    "totalPrice", "status", "createdAt"
FROM "Booking";

DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";

CREATE INDEX "Booking_houseId_idx" ON "Booking"("houseId");

PRAGMA foreign_keys=ON;
