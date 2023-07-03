DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;


CREATE TABLE user_account (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number INT,
  email VARCHAR(100),
  above18 Boolean, 
  borough VARCHAR(50),
  password CHAR(10) NOT NULL,
  PRIMARY KEY (users_id)
)



CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);
