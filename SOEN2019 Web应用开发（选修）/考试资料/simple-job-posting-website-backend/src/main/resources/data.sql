INSERT INTO `role` (`id`, `name`, `description`)
VALUES (1, 'admin', '管理员');
INSERT INTO `role` (`id`, `name`, `description`)
VALUES (2, 'user', '普通用户');
INSERT INTO `user` (`id`, `username`, `password`, `salt`, `email`, `phone`)
VALUES (
        1,
        'su',
        'd820a5bc8601f123df69f7f14779cbfd',
        'STsKeQDa7Mo7Sy3HKYgFLA==',
        'example@example.com',
        '12345678901'
    );
INSERT INTO `user_mtm_role` (`user_id`, `role_id`)
VALUES (1, 1);