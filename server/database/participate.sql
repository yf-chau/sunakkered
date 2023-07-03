DROP TABLE IF EXISTS participate;

CREATE TABLE participate (
    participate_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,  
    phone_number INT
);