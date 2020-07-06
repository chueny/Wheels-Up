DROP DATABASE IF EXISTS countries_db;

CREATE DATABASE countries_db;

USE countries_db;

CREATE TABLE country(
	id INT NOT NULL AUTO_INCREMENT,
    country_name VARCHAR (255) NOT NULL, 
    visited BOOL DEFAULT false,
    PRIMARY KEY (id)
);