DROP DATABASE IF EXISTS country_db;

CREATE DATABASE country_db;

USE country_db;

CREATE TABLE Countries(
	id INT NOT NULL AUTO_INCREMENT,
    country_name VARCHAR(255) NOT NULL, 
    desired BOOLEAN DEFAULT FALSE,
    visited BOOLEAN DEFAULT FALSE,
    population INT NOT NULL,
    region VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Notes(
	id INT NOT NULL AUTO_INCREMENT,
    note_title VARCHAR(50) NOT NULL, 
    note_text TEXT NOT NULL,
    PRIMARY KEY (id)
);