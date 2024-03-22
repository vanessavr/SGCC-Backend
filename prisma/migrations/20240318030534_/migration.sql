/*
  Warnings:

  - You are about to drop the column `departamento` on the `CursoComplementario` table. All the data in the column will be lost.
  - Added the required column `ciudad` to the `CursoComplementario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CursoComplementario" DROP COLUMN "departamento",
ADD COLUMN     "ciudad" CHAR(1) NOT NULL;
