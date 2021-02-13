USE employee_coordinatorDB;

INSERT INTO department (name)
VALUES ("Infield"), ("Outfield"), ("Battery"), ("Coaching Staff");

INSERT INTO role (title, salary, department_id)
VALUES ("Pitcher", "$2,000,000", 3), ("Catcher", "$20,000,000", 3), ("Third Base", "$26,000,000", 1), ("Center Field", "$578,300", 2), ("General Manager",  "$700,00", 4), ("Pitching Coach",  "$700,00", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Shildt ", 5, NULL), ("Mike", "Maddux ", 6, NULL), ("Adam", "Wainwright ", 1, 1), ("Harrison", "Bader ", 4, 1), ("Nolan", "Arenado ", 3, 1), ("Yadier", "Molina ", 2, 1);
