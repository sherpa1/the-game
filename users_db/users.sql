-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

USE `thegame`;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uuid` varchar(36) NOT NULL COMMENT 'uuid v4',
  `firstname` varchar(32) NOT NULL,
  `lastname` varchar(36) NOT NULL,
  `gender` varchar(8) NOT NULL COMMENT 'male / female',
  `email` varchar(32) NOT NULL,
  `authorized` tinyint(4) unsigned NOT NULL COMMENT '1/0',
  `role` varchar(8) NOT NULL COMMENT 'admin/player',
  `password` varchar(256) NOT NULL,
  UNIQUE KEY `uuid` (`uuid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2021-01-07 23:49:53
