CREATE TABLE `student` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `birth` DATE NOT NULL
);
CREATE TABLE `clazz` (
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
INSERT INTO `student` (`id`, `name`, `birth`) VALUES (1, 'John', '1990-01-01');
INSERT INTO `student` (`id`, `name`, `birth`) VALUES (2, 'Mary', '1991-01-01');
INSERT INTO `clazz` (`id`, `name`) VALUES (1, 'Class A');
INSERT INTO `clazz` (`id`, `name`) VALUES (2, 'Class B');