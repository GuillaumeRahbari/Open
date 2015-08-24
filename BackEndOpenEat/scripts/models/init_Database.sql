CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."shops" (
    "id" serial,
    "restName" text,
    "lon" numeric,
    "lat" numeric,
    "type" text,
    "sousType" text,
    "address1" text,
    "address2" text,
    "BP" text,
    "postCode" serial,
    "inseeNum" text,
    "commune" text,
    "cedex" text,
    "url" text,
    "blog" text,
    "winestore" text,
    "tel" text,
    "fax" text,
    "portable" text,
    "email" text,
    "facebook" text,
    "twitter" text,
    "pinterest" text,
    "heading" serial,
    "id_user" integer,
    FOREIGN KEY ("id_user") REFERENCES users(id),
    PRIMARY KEY ("id")
);
