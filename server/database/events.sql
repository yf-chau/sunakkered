DROP TABLE IF EXISTS events;

CREATE TABLE events (
  events_id INT GENERATED ALWAYS AS IDENTITY,
  event_name VARCHAR(100),
  event_start_date DATE,
  event_start_time TIME,
  event_end_date DATE,
  event_end_time TIME,
  event_description VARCHAR(100),
  location VARCHAR(100),
  category VARCHAR(100),
  users_id INT,
  PRIMARY KEY (events_id),
  FOREIGN KEY (users_id) REFERENCES users(users_id)
);