DROP TABLE IF EXISTS participate;

CREATE TABLE participate (
    participate_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,  
    phone_number INT
);

INSERT INTO participate (first_name, last_name, phone_number)
VALUES    
  ('John', 'Doe', NULL),
  ('Jane', 'Smith', NULL),
  ('Michael', 'Johnson', NULL),
  ('Emily', 'Williams', NULL),
  ('Daniel', 'Brown', NULL),
  ('Olivia', 'Davis', NULL),
  ('James', 'Miller', NULL),
  ('Sophia', 'Wilson', NULL),
  ('David', 'Taylor', NULL),
  ('Emma', 'Anderson', NULL);