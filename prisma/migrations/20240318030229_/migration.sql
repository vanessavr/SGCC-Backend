-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombres" VARCHAR(60) NOT NULL,
    "apellidos" VARCHAR(60) NOT NULL,
    "tipoDocumento" CHAR(1) NOT NULL,
    "numeroIdentificacion" VARCHAR(10) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "genero" CHAR(1) NOT NULL,
    "correoElectronico" VARCHAR(60) NOT NULL,
    "celular" VARCHAR(10) NOT NULL,
    "departamento" CHAR(1) NOT NULL,
    "ciudad" CHAR(1) NOT NULL,
    "foto" VARCHAR(50),
    "password" VARCHAR(50) NOT NULL,
    "poblacionEspecial" CHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nit" VARCHAR(11) NOT NULL,
    "representanteLegal" VARCHAR(60) NOT NULL,
    "razonSocial" VARCHAR(60) NOT NULL,
    "correoElectronico" VARCHAR(60) NOT NULL,
    "celular" VARCHAR(10) NOT NULL,
    "direccion" VARCHAR(50) NOT NULL,
    "actividadEconomica" CHAR(1) NOT NULL,
    "departamento" CHAR(1) NOT NULL,
    "ciudad" CHAR(1) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ambiente" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(60) NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "centroFormacion" CHAR(1) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Ambiente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursoComplementario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(60) NOT NULL,
    "areaFormacion" VARCHAR(60) NOT NULL,
    "fichaFormacion" VARCHAR(7) NOT NULL,
    "centroFormacion" CHAR(1) NOT NULL,
    "jornada" CHAR(1) NOT NULL,
    "instructorId" UUID NOT NULL,
    "ambienteId" UUID NOT NULL,
    "departamento" CHAR(1) NOT NULL,
    "duracion" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "fechaCierreInscripcion" TIMESTAMP(3) NOT NULL,
    "cuposDisponibles" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CursoComplementario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fechaSolicitud" TIMESTAMP(3) NOT NULL,
    "origenSolicitud" CHAR(1) NOT NULL,
    "radicadoSolicitud" VARCHAR(20) NOT NULL,
    "segmento" CHAR(1) NOT NULL,
    "cuposSolicitados" INTEGER NOT NULL,
    "usuarioId" UUID NOT NULL,
    "tipoSolicitud" CHAR(1) NOT NULL,
    "cursoComplementarioId" UUID NOT NULL,
    "estadoSolicitud" CHAR(1) NOT NULL,
    "motivoSolicitud" CHAR(1) NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitudEmpresa" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "empresaId" UUID NOT NULL,
    "solicitudId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SolicitudEmpresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsableSolicitud" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuarioId" UUID NOT NULL,
    "solicitudId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ResponsableSolicitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cursoComplementarioId" UUID NOT NULL,
    "ambienteId" UUID NOT NULL,
    "fechaHoraInicio" TIMESTAMP(3) NOT NULL,
    "fechaHoraFin" TIMESTAMP(3) NOT NULL,
    "instructorId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(60) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRol" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rolId" UUID NOT NULL,
    "usuarioId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UsuarioRol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correoElectronico_key" ON "Usuario"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_correoElectronico_key" ON "Empresa"("correoElectronico");

-- CreateIndex
CREATE UNIQUE INDEX "CursoComplementario_fichaFormacion_key" ON "CursoComplementario"("fichaFormacion");

-- CreateIndex
CREATE UNIQUE INDEX "CursoComplementario_instructorId_key" ON "CursoComplementario"("instructorId");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitud_radicadoSolicitud_key" ON "Solicitud"("radicadoSolicitud");

-- CreateIndex
CREATE UNIQUE INDEX "SolicitudEmpresa_solicitudId_key" ON "SolicitudEmpresa"("solicitudId");

-- CreateIndex
CREATE UNIQUE INDEX "ResponsableSolicitud_solicitudId_key" ON "ResponsableSolicitud"("solicitudId");

-- AddForeignKey
ALTER TABLE "CursoComplementario" ADD CONSTRAINT "CursoComplementario_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoComplementario" ADD CONSTRAINT "CursoComplementario_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_cursoComplementarioId_fkey" FOREIGN KEY ("cursoComplementarioId") REFERENCES "CursoComplementario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudEmpresa" ADD CONSTRAINT "SolicitudEmpresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitudEmpresa" ADD CONSTRAINT "SolicitudEmpresa_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsableSolicitud" ADD CONSTRAINT "ResponsableSolicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsableSolicitud" ADD CONSTRAINT "ResponsableSolicitud_solicitudId_fkey" FOREIGN KEY ("solicitudId") REFERENCES "Solicitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_cursoComplementarioId_fkey" FOREIGN KEY ("cursoComplementarioId") REFERENCES "CursoComplementario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_ambienteId_fkey" FOREIGN KEY ("ambienteId") REFERENCES "Ambiente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioRol" ADD CONSTRAINT "UsuarioRol_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
