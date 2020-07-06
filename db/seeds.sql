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

SELECT * FROM countries;