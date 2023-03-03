/*
  Warnings:

  - You are about to alter the column `time` on the `tb_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `session` MODIFY `data` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `tb_order` MODIFY `time` DATETIME NOT NULL;
