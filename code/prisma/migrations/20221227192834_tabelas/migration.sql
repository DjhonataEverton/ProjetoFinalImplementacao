-- CreateTable
CREATE TABLE `tb_client` (
    `id_client` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf_cnpj` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tb_client_cpf_cnpj_key`(`cpf_cnpj`),
    PRIMARY KEY (`id_client`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_order` (
    `id_order` INTEGER NOT NULL AUTO_INCREMENT,
    `product` VARCHAR(45) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `time` DATETIME NOT NULL,
    `accept` CHAR(1) NOT NULL,
    `idClient` INTEGER NOT NULL,

    PRIMARY KEY (`id_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_commissionare` (
    `id_commissionare` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` INTEGER NOT NULL,
    `name` VARCHAR(75) NOT NULL,
    `email` VARCHAR(75) NOT NULL,
    `password` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tb_commissionare_cpf_key`(`cpf`),
    PRIMARY KEY (`id_commissionare`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_products` (
    `id_products` INTEGER NOT NULL AUTO_INCREMENT,
    `product` VARCHAR(45) NOT NULL,
    `price` INTEGER NOT NULL,
    `unity` TEXT NOT NULL,

    PRIMARY KEY (`id_products`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_order` ADD CONSTRAINT `tb_order_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `tb_client`(`id_client`) ON DELETE RESTRICT ON UPDATE CASCADE;
