CREATE TABLE "twoFactorConfirmation" (
	"id" text,
	"userId" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isTwoFactoredEnabled" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "twoFactorConfirmation" ADD CONSTRAINT "twoFactorConfirmation_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;