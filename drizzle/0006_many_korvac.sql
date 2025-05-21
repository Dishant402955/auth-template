ALTER TABLE "verification_token" RENAME COLUMN "identifier" TO "id";--> statement-breakpoint
ALTER TABLE "verification_token" DROP CONSTRAINT "verification_token_identifier_token_pk";--> statement-breakpoint
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_id_token_pk" PRIMARY KEY("id","token");--> statement-breakpoint
ALTER TABLE "verification_token" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_token_unique" UNIQUE("token");