DROP TABLE IF EXISTS complaint_votes;

DROP TABLE IF EXISTS complaints;

CREATE TABLE complaints (
    id INT GENERATED ALWAYS AS IDENTITY,
    complainant_id INT ,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(2000),
    location VARCHAR(100),
    category VARCHAR(100),
    isfixed Boolean,
    image_url VARCHAR(200),
    FOREIGN KEY(complainant_id) REFERENCES users(users_id),
    PRIMARY KEY(id)
);

CREATE TABLE complaint_votes (
    id INT GENERATED ALWAYS AS IDENTITY,
    complaint_id INT NOT NULL,
    users_id INT NOT NULL,
    FOREIGN KEY(complaint_id) REFERENCES complaints(id),
    FOREIGN KEY(users_id) REFERENCES users(users_id),
    PRIMARY KEY(id)
);

INSERT INTO
    complaints (
        complainant_id,
        title,
        description,
        location,
        category,
        isfixed,
        image_url
    )
VALUES
    (
        1,
        'Broken Streetlight',
        'There is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.',
        'Elm Street, near Maple Avenue',
        'Public Infrastructure',
        false,
        'https://example.com/streetlight.jpg'
    ),
    (
        1,
        'Pothole on Main Road',
        'There is a large pothole on Main Road, just before the traffic light at Oak Street. It poses a significant risk to vehicles and has already caused damage to several cars. Urgent repair is needed.',
        'Main Road, near Oak Street',
        'Road Maintenance',
        false,
        'https://example.com/pothole.jpg'
    ),
    (
        1,
        'Noise Complaint - Loud Party',
        'There is a house on Maple Avenue that has been hosting loud parties every weekend, causing disturbance and sleepless nights for the neighborhood. The noise levels are excessive and violate the local noise regulations.',
        'Maple Avenue',
        'Noise Pollution',
        false,
        'https://example.com/loudparty.jpg'
    ),
    (
        2,
        'Garbage Overflowing in Park',
        'The garbage cans in the local park on Oak Street are overflowing, and the trash is scattered all over the place. This creates an unsightly and unhygienic environment for park visitors and needs immediate attention.',
        'Oak Street Park',
        'Public Parks',
        false,
        'https://example.com/garbageoverflow.jpg'
    ),
    (
        2,
        'Graffiti on Public Building',
        'The side wall of the public library on Elm Street has been defaced with graffiti. This vandalism is not only an eyesore but also reflects poorly on the community. It should be cleaned up promptly.',
        'Elm Street Public Library',
        'Vandalism',
        false,
        'https://example.com/graffiti.jpg'
    );

INSERT INTO
    complaint_votes (complaint_id, user_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 5),
    (4, 9),
    (3, 4),
    (2, 8),
    (2, 3),
    (5, 2),
    (3, 7),
    (5, 1),
    (2, 10),
    (4, 5),
    (1, 8),
    (1, 10),
    (4, 6),
    (3, 9),
    (2, 1),
    (5, 6),
    (3, 3),
    (5, 9),
    (1, 4),
    (4, 10),
    (2, 7),
    (2, 4),
    (5, 3),
    (3, 8),
    (4, 3),
    (1, 9),
    (4, 8),
    (3, 1),
    (5, 4),
    (2, 9),
    (2, 2),
    (5, 7),
    (3, 6),
    (5, 10),
    (1, 3),
    (4, 4),
    (1, 6),
    (1, 7),
    (4, 2),
    (3, 5),
    (2, 6),
    (2, 5),
    (5, 8),
    (3, 10),
    (4, 7),
    (1, 2),
    (4, 1),
    (3, 2),
    (5, 5),
    (1, 5),
    (4, 9)
