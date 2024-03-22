/*
  Warnings:

  - Added the required column `departamento` to the `CursoComplementario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CursoComplementario" ADD COLUMN     "departamento" VARCHAR(2) NOT NULL,
ALTER COLUMN "ciudad" SET DATA TYPE VARCHAR(2);
