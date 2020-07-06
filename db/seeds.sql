<<<<<<< HEAD
USE country_db;

INSERT INTO countries (country_name, visited, population, region)
VALUES('Spain', FALSE, 40397842, 'WESTERN EUROPE'); 

INSERT INTO countries (country_name, visited, population, region)
VALUES('Italy', FALSE, 58133509, 'WESTERN EUROPE');

INSERT INTO countries (country_name, visited, population, region)
VALUES('Canada', FALSE, 33098932, 'NORTHERN AMERICA'); 

INSERT INTO countries (country_name, visited, population, region)
VALUES('Peru', FALSE, 28302603, 'LATIN AMER. & CARIB');

INSERT INTO countries (country_name, visited, population, region)
VALUES('Egypt', FALSE, 78887007, 'NORTHERN AFRICA');
=======
USE countries_db;

INSERT INTO countries (country_name, visited)
VALUES('Spain', FALSE); 

INSERT INTO countries (country_name, visited)
VALUES('Italy', FALSE);  

INSERT INTO burgers (burger_name, devoured)
VALUES('France', FALSE); 

INSERT INTO burgers (burger_name, devoured)
VALUES('Japan', FALSE);

INSERT INTO burgers (burger_name, devoured)
VALUES('Peru', FALSE);

INSERT INTO burgers (burger_name, devoured)
VALUES('Spain', FALSE);
>>>>>>> 32deb4baa415871dd4561d404b842ef0277dcbd0

SELECT * FROM countries;