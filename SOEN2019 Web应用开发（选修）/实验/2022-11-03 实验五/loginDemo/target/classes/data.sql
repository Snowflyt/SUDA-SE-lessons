CREATE TABLE user (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL
);
INSERT INTO user (username, password)
VALUES ('admin', 'admin');
CREATE TABLE problem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    problem VARCHAR(100) NOT NULL,
    answer VARCHAR(100) NOT NULL
);
INSERT INTO problem (problem, answer)
VALUES ('1 + 1', '2');
INSERT INTO problem (problem, answer)
VALUES ('2 + 2', '4');
INSERT INTO problem (problem, answer)
VALUES ('3 + 3', '6');
INSERT INTO problem (problem, answer)
VALUES ('1 - 1', '0');
INSERT INTO problem (problem, answer)
VALUES ('2 - 2', '0');
INSERT INTO problem (problem, answer)
VALUES ('3 - 3', '0');
INSERT INTO problem (problem, answer)
VALUES ('1 * 1', '1');
INSERT INTO problem (problem, answer)
VALUES ('2 * 2', '4');
INSERT INTO problem (problem, answer)
VALUES ('3 * 3', '9');
INSERT INTO problem (problem, answer)
VALUES ('1 / 1', '1');
INSERT INTO problem (problem, answer)
VALUES ('2 / 2', '1');
INSERT INTO problem (problem, answer)
VALUES ('3 / 3', '1');