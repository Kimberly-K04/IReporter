CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "username" text UNIQUE NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "is_admin" boolean DEFAULT false,
  "created_at" datatime,
  "update_at" datatime
);

CREATE TABLE "record" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "type" enum NOT NULL,
  "title" text NOT NULL,
  "description" text NOT NULL,
  "status" enum DEFAULT 'pending',
  "latitude" float,
  "created_at" datatime,
  "updated_at" datetime
);

CREATE TABLE "image" (
  "id" integer PRIMARY KEY,
  "record_id" integer NOT NULL,
  "image_url" text NOT NULL,
  "created_at" datetime
);

CREATE TABLE "video" (
  "id" integer PRIMARY KEY,
  "record_id" integer NOT NULL,
  "video_url" text NOT NULL,
  "created_at" datetime
);

ALTER TABLE "user" ADD CONSTRAINT "records" FOREIGN KEY ("id") REFERENCES "record" ("user_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "record" ADD CONSTRAINT "images" FOREIGN KEY ("id") REFERENCES "image" ("record_id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "record" ADD CONSTRAINT "videos" FOREIGN KEY ("id") REFERENCES "video" ("record_id") DEFERRABLE INITIALLY IMMEDIATE;
