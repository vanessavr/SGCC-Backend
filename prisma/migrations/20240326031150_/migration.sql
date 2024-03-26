/*
  Warnings:

  - You are about to drop the `SolicitudEmpresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Solicitud" DROP CONSTRAINT "Solicitud_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "SolicitudEmpresa" DROP CONSTRAINT "SolicitudEmpresa_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "SolicitudEmpresa" DROP CONSTRAINT "SolicitudEmpresa_solicitudId_fkey";

-- AlterTable
ALTER TABLE "Solicitud" ADD COLUMN     "empresaId" UUID,
ALTER COLUMN "usuarioId" DROP NOT NULL;

-- DropTable
DROP TABLE "SolicitudEmpresa";

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
