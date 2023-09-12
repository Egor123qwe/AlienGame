CREATE TABLE games_status
(
    id SERIAL PRIMARY KEY,
    code varchar NOT NULL unique,
    status BOOLEAN NOT NULL
);