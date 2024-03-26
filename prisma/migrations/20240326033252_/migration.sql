-- AlterTable
ALTER TABLE "Solicitud" ADD COLUMN     "usuarioInvitadoId" UUID;

-- CreateTable
CREATE TABLE "UsuarioInvitado" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombres" VARCHAR(60) NOT NULL,
    "apellidos" VARCHAR(60) NOT NULL,
    "tipoDocumento" VARCHAR(1) NOT NULL,
    "numeroIdentificacion" VARCHAR(10) NOT NULL,
    "correoElectronico" VARCHAR(60) NOT NULL,
    "celular" VARCHAR(10) NOT NULL,
    "departamento" VARCHAR(2) NOT NULL,
    "ciudad" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UsuarioInvitado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioInvitado_numeroIdentificacion_key" ON "UsuarioInvitado"("numeroIdentificacion");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioInvitado_correoElectronico_key" ON "UsuarioInvitado"("correoElectronico");

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_usuarioInvitadoId_fkey" FOREIGN KEY ("usuarioInvitadoId") REFERENCES "UsuarioInvitado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
