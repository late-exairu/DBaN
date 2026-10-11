DO $$ BEGIN
	IF EXISTS (
		SELECT 1
		FROM "forms" AS form
		LEFT JOIN "user" AS account ON account."id" = form."user_id"
		WHERE form."user_id" IS NOT NULL AND account."id" IS NULL
	) THEN
		RAISE EXCEPTION 'Cannot add forms.user_id foreign key: forms reference missing users';
	END IF;
	IF EXISTS (
		SELECT 1
		FROM "forms"
		WHERE "user_id" IS NOT NULL AND "name" IS NOT NULL
		GROUP BY "user_id", "name"
		HAVING COUNT(*) > 1
	) THEN
		RAISE EXCEPTION 'Cannot enforce unique form names per user: duplicates exist';
	END IF;
END $$;--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "forms_user_id_name_unique" ON "forms" USING btree ("user_id","name");