<<<<<<< HEAD
DROP DATABASE IF EXISTS country_db;

CREATE DATABASE country_db;

USE country_db;

CREATE TABLE countries(
	id INT NOT NULL AUTO_INCREMENT,
    country_name VARCHAR(255) NOT NULL, 
    visited BOOLEAN DEFAULT FALSE,
    population INT NOT NULL,
    region VARCHAR(255) NOT NULL,
=======
DROP DATABASE IF EXISTS countries_db;

CREATE DATABASE countries_db;

USE countries_db;

CREATE TABLE country(
	id INT NOT NULL AUTO_INCREMENT,
    country_name VARCHAR (255) NOT NULL, 
    visited BOOL DEFAULT false,
>>>>>>> 32deb4baa415871dd4561d404b842ef0277dcbd0
    PRIMARY KEY (id)
);