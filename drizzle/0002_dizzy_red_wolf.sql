DELETE FROM "userFavorite";--> statement-breakpoint
DO $$ BEGIN
	IF EXISTS (
		SELECT 1
		FROM "profile"
		GROUP BY "user_id"
		HAVING COUNT(*) > 1
	) THEN
		RAISE EXCEPTION 'Cannot enforce one profile per user: duplicate profile rows exist';
	END IF;
END $$;--> statement-breakpoint
ALTER TABLE "userFavorite" ADD COLUMN "game" text;--> statement-breakpoint
ALTER TABLE "userFavorite" ADD COLUMN "gameId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "userFavorite" ADD COLUMN "gameImg" text;--> statement-breakpoint
ALTER TABLE "userFavorite" ADD CONSTRAINT "userFavorite_formId_forms_id_fk" FOREIGN KEY ("formId") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "profile_user_id_unique" ON "profile" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "userFavorite_userId_gameId_unique" ON "userFavorite" USING btree ("userId","gameId");