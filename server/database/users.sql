DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS participate;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  users_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone_number INT,
  email VARCHAR(100),
  above18 Boolean, 
  borough VARCHAR(50),
  password CHAR(10),
  image_url VARCHAR(100),
  PRIMARY KEY (users_id)
)

-- INSERT INTO users (username, first_name, last_name, phone_number, email, above18, borough, password, image_url)
-- VALUES("ad","222","daw",3242432,"eesfwda",True,"wadawd","adfwda","wfafaw")
