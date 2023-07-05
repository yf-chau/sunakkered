DROP TABLE IF EXISTS admin;

CREATE TABLE admin (
    admin_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) UNIQUE NOT NULL,
    admin_first_name VARCHAR(100) NOT NULL,
    admin_last_name VARCHAR (100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(admin_id)
    );

