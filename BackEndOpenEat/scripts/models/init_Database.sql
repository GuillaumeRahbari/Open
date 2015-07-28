CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" serial,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."shops" (
    "id" serial,
    "latitude" numeric,
    "longitude" numeric,
    "description" text,
    "id_user" serial,
    FOREIGN KEY ("id_user") REFERENCES users(id),
    PRIMARY KEY ("id")
);
