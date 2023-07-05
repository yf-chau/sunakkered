-- DROP TABLE IF EXISTS events;
-- DROP TABLE IF EXISTS participate;
-- DROP TABLE  IF EXISTS users;
DROP TABLE IF EXISTS volunteer;

CREATE TABLE volunteer (
    volunteer_id INT GENERATED ALWAYS AS IDENTITY,
    candrive BOOLEAN,
    description VARCHAR(1000),
    DBS BOOLEAN,
    interests VARCHAR(100),
    skills VARCHAR(100),
    users_id INT,
    FOREIGN KEY(users_id) REFERENCES users(users_id),
    PRIMARY KEY (volunteer_id)
);

INSERT INTO volunteer (candrive, description, DBS, interests, skills, users_id)
VALUES 
    (TRUE, 'Passionate about community service', TRUE, 'Cooking, Gardening', 'Communication, Leadership', 1),
    (FALSE, 'Enthusiastic about animal welfare', FALSE, 'Hiking, Photography', 'Animal handling, First aid', 2),
    (TRUE, 'Experienced in event planning', TRUE, 'Music, Sports', 'Organizational skills, Problem-solving', 3),
    (FALSE, 'Passionate about environmental conservation', TRUE, 'Hiking, Painting', 'Research, Data analysis', 4),
    (TRUE, 'Dedicated to promoting education', FALSE, 'Reading, Writing', 'Tutoring, Mentoring', 5),
    (TRUE, 'Passionate about community service', TRUE, 'Cooking, Gardening', 'Communication, Leadership', 6),
    (FALSE, 'Enthusiastic about animal welfare', FALSE, 'Hiking, Photography', 'Animal handling, First aid', 7),
    (TRUE, 'Experienced in event planning', TRUE, 'Music, Sports', 'Organizational skills, Problem-solving', 8),
    (FALSE, 'Passionate about environmental conservation', TRUE, 'Hiking, Painting', 'Research, Data analysis', 9),
    (TRUE, 'Dedicated to promoting education', FALSE, 'Reading, Writing', 'Tutoring, Mentoring', 10);




