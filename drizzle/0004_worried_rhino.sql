CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'USER';