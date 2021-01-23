INSERT INTO department (name)
VALUES ("Marketing"),
("Sales"),
("Accounting"),
("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Creative Director", 75.375, 1),
("Junior Copywriter", 35.430, 1),
("Salesperson", 45.500, 2),
("Head Accountant", 63.200, 3),
("Junior Accountant", 42.320, 3),
("HR Rep", 49.240, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joy", "Schmidt", 3, 0),
("Gerald", "Foster", 4, 0),
("Stuart", "Frazier", 1, 0),
("Nicholas", "Simmons", 2, 3),
("Sheri", "Beck", 5, 2),
("Jack", "Logan", 5, 2),
("Valerie", "Anderson", 6, 0);