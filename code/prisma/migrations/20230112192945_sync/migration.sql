/*
  Warnings:

  - You are about to alter the column `time` on the `tb_order` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `tb_admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `tb_order` MODIFY `time` DATETIME NOT NULL;

-- DropTable
DROP TABLE `tb_admin`;
