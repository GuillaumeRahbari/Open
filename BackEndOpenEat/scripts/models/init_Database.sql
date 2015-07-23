CREATE TABLE IF NOT EXISTS "public"."shops" (
    "id" serial,
    "latitude" numeric,
    "longitude" numeric,
    "description" text,
    PRIMARY KEY ("id")
);
