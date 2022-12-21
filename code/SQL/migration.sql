CREATE DATABASE IF NOT EXISTS ctPedidos;
use ctPedidos;

CREATE TABLE IF NOT EXISTS `ctpedidos`.`tb_client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `cpf_cnpj` INT(15) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_client`));
  
CREATE TABLE IF NOT EXISTS `ctpedidos`.`tb_products` (
  `id_products` INT NOT NULL AUTO_INCREMENT,
  `product` VARCHAR(45) NOT NULL,
  `price` INT(10) NOT NULL,
  `unity` ENUM('quilograma', 'litro') NOT NULL,
  PRIMARY KEY (`id_products`));

CREATE TABLE IF NOT EXISTS `ctpedidos`.`tb_commissionare` (
  `id_commissionare` INT NOT NULL AUTO_INCREMENT,
  `cpf` INT(11) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_commissionare`));

CREATE TABLE `ctpedidos`.`tb_order` (
  `id_order` INT NOT NULL AUTO_INCREMENT,
  `id_client` INT NOT NULL,
  `product` VARCHAR(45) NOT NULL,
  `quantity` INT(10) NOT NULL,
  `time` DATETIME NOT NULL,
  `accpet` CHAR NOT NULL,
  PRIMARY KEY (`id_order`));
