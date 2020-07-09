USE country_db;

INSERT INTO Countries (country_name, desired, visited, population, region)
VALUES('Spain', TRUE, FALSE, 40397842, 'WESTERN EUROPE'); 

INSERT INTO Countries (country_name, desired, visited, population, region)
VALUES('Italy', FALSE, TRUE, 58133509, 'WESTERN EUROPE');

INSERT INTO Countries (country_name, desired, visited, population, region)
VALUES('Canada', TRUE, FALSE, 33098932, 'NORTHERN AMERICA'); 

INSERT INTO Countries (country_name, desired, visited, population, region)
VALUES('Peru', FALSE, TRUE, 28302603, 'LATIN AMER. & CARIB');

INSERT INTO Countries (country_name, desired, visited, population, region)
VALUES('Egypt', FALSE, FALSE, 78887007, 'NORTHERN AFRICA');

SELECT * FROM Countries;