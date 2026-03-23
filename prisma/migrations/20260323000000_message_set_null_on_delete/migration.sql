-- AlterTable: Change Message foreign keys from Cascade to SetNull
-- This prevents deleting a user from destroying the other party's messages

-- Drop existing foreign key constraints
ALTER TABLE "Message" DROP CONSTRAINT IF EXISTS "Message_senderId_fkey";
ALTER TABLE "Message" DROP CONSTRAINT IF EXISTS "Message_receiverId_fkey";

-- Make columns nullable
ALTER TABLE "Message" ALTER COLUMN "senderId" DROP NOT NULL;
ALTER TABLE "Message" ALTER COLUMN "receiverId" DROP NOT NULL;

-- Re-add foreign keys with SetNull behavior
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
