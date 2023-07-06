DROP TABLE IF EXISTS complaint_votes;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS participate;
DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(100),
  above18 Boolean, 
  borough VARCHAR(50),
  password VARCHAR(100) NOT NULL,
  image_url VARCHAR(100),
  PRIMARY KEY (users_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users("users_id")
);



INSERT INTO users (username, first_name, last_name, phone_number, email, above18, borough, password, image_url)
VALUES
  ('john_doe', 'John', 'Doe', '1234567890', 'john.doe@example.com', true, 'Bigfoot', 'password1', 'https://example.com/johndoe.jpg'),
  ('jane_smith', 'Jane', 'Smith', '9876543210', 'jane.smith@example.com', true, 'Accident', 'password2', 'https://example.com/janesmith.jpg'),
  ('michael_johnson', 'Michael', 'Johnson', '5678901234', 'michael.johnson@example.com', true, 'Embarrass', 'password3', 'https://example.com/michaeljohnson.jpg'),
  ('emily_williams', 'Emily', 'Williams', '4321098765', 'emily.williams@example.com', true, 'Accident', 'password4', 'https://example.com/emilywilliams.jpg'),
  ('daniel_brown', 'Daniel', 'Brown', '8765432109', 'daniel.brown@example.com', true, 'Coward', 'password5', 'https://example.com/danielbrown.jpg'),
  ('olivia_davis', 'Olivia', 'Davis', '2468135790', 'olivia.davis@example.com', true, 'Dummer', 'password6', 'https://example.com/oliviadavis.jpg'),
  ('james_miller', 'James', 'Miller', '1357924680', 'james.miller@example.com', true, 'Climax', 'password7', 'https://example.com/jamesmiller.jpg'),
  ('sophia_wilson', 'Sophia', 'Wilson', '7890123456', 'sophia.wilson@example.com', true, 'Bumpass', 'password8', 'https://example.com/sophiawilson.jpg'),
  ('david_taylor', 'David', 'Taylor', '3690246813', 'david.taylor@example.com', true, 'Crapstone', 'password9', 'https://example.com/davidtaylor.jpg'),
  ('emma_anderson', 'Emma', 'Anderson', '2468135790', 'emma.anderson@example.com', true, 'Beaverlick', 'password10', 'https://example.com/emmaanderson.jpg');
