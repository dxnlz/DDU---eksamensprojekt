-- ID generator for users - https://stackoverflow.com/a/41988979
CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE bigint) returns bigint AS $$
DECLARE
l1 bigint;
l2 bigint;
r1 bigint;
r2 bigint;
i int:=0;
BEGIN
    l1:= (VALUE >> 32) & 4294967295::bigint;
    r1:= VALUE & 4294967295;
    WHILE i < 3 LOOP
        l2 := r1;
        r2 := l1 # ((((1366.0 * r1 + 150889) % 714025) / 714025.0) * 32767*32767)::int;
        l1 := l2;
        r1 := r2;
        i := i + 1;
    END LOOP;
RETURN ((l1::bigint << 32) + r1);
END;
$$ LANGUAGE plpgsql strict immutable;

-- Create tables
CREATE TABLE IF NOT EXISTS "products"(
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" INTEGER,
    "image" bytea,
    "created" DATE NOT NULL,
    "last_updated" DATE NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "categories"(
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "name" TEXT NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS "users"(
    "id" BIGINT DEFAULT pseudo_encrypt(123456),
    "username" TEXT NOT NULL UNIQUE,
    "birthday" DATE,
    "country" INTEGER,
    "registered" DATE NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" bytea,
    PRIMARY KEY (id)
);
COMMENT ON COLUMN
    "users"."password" IS 'argon2id password hash';

CREATE TABLE IF NOT EXISTS "reviews"(
    "id" INT GENERATED ALWAYS AS IDENTITY,
    "stars" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" BIGINT NOT NULL REFERENCES users(id),
    "created" DATE NOT NULL,
    "product" INTEGER NOT NULL,
    "last_updated" DATE NOT NULL,
    PRIMARY KEY (id)
);

-- Create relations
ALTER TABLE IF EXISTS
    "products" ADD CONSTRAINT "fk_category" FOREIGN KEY("category") REFERENCES "categories"("id");
ALTER TABLE IF EXISTS
    "reviews" ADD CONSTRAINT "fk_product" FOREIGN KEY("product") REFERENCES "products"("id");
ALTER TABLE IF EXISTS
    "users" ADD CONSTRAINT "fk_country" FOREIGN KEY("country") REFERENCES "countries"("id");
