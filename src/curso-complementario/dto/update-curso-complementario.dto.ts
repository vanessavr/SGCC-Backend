import { PartialType } from '@nestjs/swagger';
import { CreateCursoComplementarioDto } from './create-curso-complementario.dto';

export class UpdateCursoComplementarioDto extends PartialType(CreateCursoComplementarioDto) {}
