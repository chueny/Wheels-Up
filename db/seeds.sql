USE country_db;

INSERT INTO countries (country_name, desired, visited, population, region)
VALUES('Spain', FALSE, FALSE, 40397842, 'WESTERN EUROPE'); 

INSERT INTO countries (country_name, desired, visited, population, region)
VALUES('Italy', FALSE, FALSE, 58133509, 'WESTERN EUROPE');

INSERT INTO countries (country_name, desired, visited, population, region)
VALUES('Canada', FALSE, FALSE, 33098932, 'NORTHERN AMERICA'); 

INSERT INTO countries (country_name, desired, visited, population, region)
VALUES('Peru', FALSE, FALSE, 28302603, 'LATIN AMER. & CARIB');

INSERT INTO countries (country_name, desired, visited, population, region)
VALUES('Egypt', FALSE, FALSE, 78887007, 'NORTHERN AFRICA');

SELECT * FROM countries;