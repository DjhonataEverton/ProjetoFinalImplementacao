/*
  Warnings:

  - You are about to drop the column `idClient` on the `tb_order` table. All the data in the column will be lost.
  - You are about to alter the column `time` on the `tb_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `id_client` to the `tb_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_order` DROP FOREIGN KEY `tb_order_idClient_fkey`;

-- AlterTable
ALTER TABLE `tb_order` DROP COLUMN `idClient`,
    ADD COLUMN `id_client` INTEGER NOT NULL,
    MODIFY `time` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `tb_order` ADD CONSTRAINT `tb_order_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `tb_client`(`id_client`) ON DELETE RESTRICT ON UPDATE CASCADE;
