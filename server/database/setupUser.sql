DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;


CREATE TABLE user_account (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(70) NOT NULL,
  phone_number VARCHAR(100),
  email VARCHAR(100),
  above18 BOOLEAN, 
  borough VARCHAR(30),
  password VARCHAR(35) NOT NULL,
  PRIMARY KEY (user_id)
);


CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

INSERT INTO user_account (
  username,
  first_name,
  last_name,
  phone_number,
  email,
  above18, 
  borough,
  password
)
VALUES (
  'fisher',
  'fishy',
  'fishman',
  '1235678910',
  'fish@example.com',
  TRUE,
  'fisham',
  'fishes'
);
