/*
  Warnings:

  - You are about to drop the `UsuarioRol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsuarioRol" DROP CONSTRAINT "UsuarioRol_rolId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioRol" DROP CONSTRAINT "UsuarioRol_usuarioId_fkey";

-- DropTable
DROP TABLE "UsuarioRol";

-- CreateTable
CREATE TABLE "ModeloRol" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rolId" UUID NOT NULL,
    "modeloId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ModeloRol_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeloRol" ADD CONSTRAINT "ModeloRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
