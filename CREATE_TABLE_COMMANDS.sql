CREATE TABLE passwords(
	id serial PRIMARY KEY
	password VARCHAR(255) NOT NULL,
	account VARCHAR(45) NOT NULL,
);