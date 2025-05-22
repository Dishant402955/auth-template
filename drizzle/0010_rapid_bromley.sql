CREATE TABLE "two_factor_token" (
	"id" text NOT NULL,
	"email" text,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "two_factor_token_email_token_pk" PRIMARY KEY("email","token"),
	CONSTRAINT "two_factor_token_token_unique" UNIQUE("token")
);
