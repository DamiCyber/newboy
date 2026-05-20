-- Add listing type and sqft for admin-managed rent/sale listings
ALTER TABLE "House" ADD COLUMN "listingType" TEXT NOT NULL DEFAULT 'Rent';
ALTER TABLE "House" ADD COLUMN "sqft" INTEGER NOT NULL DEFAULT 0;
