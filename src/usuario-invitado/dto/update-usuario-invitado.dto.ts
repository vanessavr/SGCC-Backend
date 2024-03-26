import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioInvitadoDto } from './create-usuario-invitado.dto';

export class UpdateUsuarioInvitadoDto extends PartialType(CreateUsuarioInvitadoDto) {}
