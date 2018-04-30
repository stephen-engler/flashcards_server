CREATE SCHEMA "flashcard";

CREATE TABLE "flashcard"."person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "flashcard"."deck" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "flashcard"."person" (id) ON DELETE CASCADE,
	"deck_name" VARCHAR (80)
);

CREATE TABLE "flashcard"."card" (
	"id" SERIAL PRIMARY KEY,
	"deck_id" INT REFERENCES "flashcard"."deck" (id) ON DELETE CASCADE,
	"prompt" VARCHAR (180),
	"answer" VARCHAR (500)
);