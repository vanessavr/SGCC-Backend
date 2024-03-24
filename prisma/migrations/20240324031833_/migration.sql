/*
  Warnings:

  - A unique constraint covering the columns `[numeroIdentificacion]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usuario_numeroIdentificacion_key" ON "Usuario"("numeroIdentificacion");
