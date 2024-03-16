CREATE TABLE IF NOT EXISTS "userFavorite" (
	"userId" text NOT NULL,
	"formId" integer NOT NULL,
	"createdAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "slug" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userFavorite" ADD CONSTRAINT "userFavorite_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
