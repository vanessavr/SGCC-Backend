-- AlterTable
ALTER TABLE "CursoComplementario" ALTER COLUMN "fechaInicio" DROP NOT NULL,
ALTER COLUMN "fechaFin" DROP NOT NULL,
ALTER COLUMN "cuposDisponibles" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "password" SET DATA TYPE VARCHAR(65);

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "password" SET DATA TYPE VARCHAR(65);
