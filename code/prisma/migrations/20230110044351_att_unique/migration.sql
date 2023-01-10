/*
  Warnings:

  - You are about to alter the column `time` on the `tb_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[email]` on the table `tb_client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tb_order` MODIFY `time` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tb_client_email_key` ON `tb_client`(`email`);
