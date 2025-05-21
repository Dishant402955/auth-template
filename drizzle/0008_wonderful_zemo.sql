CREATE TABLE "password_reset_token" (
	"id" text NOT NULL,
	"email" text,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "password_reset_token_email_token_pk" PRIMARY KEY("email","token"),
	CONSTRAINT "password_reset_token_token_unique" UNIQUE("token")
);
