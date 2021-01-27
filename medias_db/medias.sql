
SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `medias`;
CREATE TABLE `medias` (
  `uuid` varchar(36) NOT NULL,
  `path` varchar(128) NOT NULL COMMENT 'parent folder path',
  `filename` varchar(32) NOT NULL COMMENT 'file + extension',
  `filetype` enum('image','data') NOT NULL COMMENT 'image or data',
  `private` tinyint(4) NOT NULL DEFAULT 0,
  `password` varchar(60) DEFAULT NULL COMMENT 'if private == true',
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;