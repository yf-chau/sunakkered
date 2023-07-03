DROP TABLE IF EXISTS events;

CREATE TABLE events (
    event_id INT GENERATED ALWAYS AS IDENTITY,
    event_name VARCHAR(100) NOT NULL,
    event_start_date DATE,
    event_start_time TIME,
    event_end_date DATE,
    event_end_time TIME,
    event_description VARCHAR(1000),
    location VARCHAR(100),
    category VARCHAR(100),
    organiser_id INT,
    -- approver_id INT,
    -- volunteer_id INT,
    participant_id INT,
    FOREIGN KEY(organiser_id) REFERENCES users(users_id),
    -- FOREIGN KEY(approver_id) REFERENCES admin(admin_id),
    -- FOREIGN KEY(volunteer_id) REFERENCES volunteer(volunteer_id),
    FOREIGN KEY(participant_id) REFERENCES users(users_id),
    PRIMARY KEY (event_id)
);

INSERT INTO
    events (
        event_name,
        event_start_date,
        event_start_time,
        event_end_date,
        event_end_time,
        event_description,
        location,
        category,
        organiser_id,
        -- approver_id,
        -- volunteer_id,
        participant_id
    )
VALUES
    ('Community Cleanup Day', '2023-07-15', '09:00:00', '2023-07-15', '12:00:00', 'Join us in cleaning up our neighborhood!', 'City Park', 'Community Service', NULL, NULL),
    ('Summer Concert in the Park', '2023-08-05', '18:30:00', '2023-08-05', '22:00:00', 'Enjoy live music performances in the park.', 'Central Park', 'Entertainment', NULL, NULL),
    ('Health and Wellness Workshop', '2023-09-10', '14:00:00', '2023-09-10', '16:00:00', 'Learn about maintaining a healthy lifestyle.', 'Community Center', 'Education', NULL, NULL),
    ('Family Fun Day', '2023-09-30', '10:00:00', '2023-09-30', '18:00:00', 'Bring your family for a day of games and activities.', 'Town Square', 'Family', NULL, NULL);
