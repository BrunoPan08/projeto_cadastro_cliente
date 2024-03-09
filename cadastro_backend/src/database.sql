CREATE DATABASE client;

CREATE TABLE client_data(
    client_id SERIAL PRIMARY KEY,
    client_name VARCHAR(50),
    client_email varchar(50),
    client_telefone varchar(50)
);

SELECT * FROM client_data;