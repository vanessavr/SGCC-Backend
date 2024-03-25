/*
  Warnings:

  - You are about to drop the column `modeloId` on the `ModeloRol` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ModeloRol" DROP COLUMN "modeloId",
ADD COLUMN     "empresaId" UUID,
ADD COLUMN     "usuarioId" UUID;

-- AddForeignKey
ALTER TABLE "ModeloRol" ADD CONSTRAINT "ModeloRol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeloRol" ADD CONSTRAINT "ModeloRol_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
