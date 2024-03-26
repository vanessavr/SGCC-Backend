import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsuarioModule } from './usuario/usuario.module'
import { EmpresaModule } from './empresa/empresa.module'
import { CursoComplementarioModule } from './curso-complementario/curso-complementario.module'
import { HorarioModule } from './horario/horario.module'
import { SolicitudModule } from './solicitud/solicitud.module'
import { AmbienteModule } from './ambiente/ambiente.module'
import { AreaFormacionModule } from './area-formacion/area-formacion.module'
import { ListasModule } from './listas/listas.module'
import { AuthModule } from './auth/auth.module'
import { RolModule } from './rol/rol.module';
import { UsuarioInvitadoModule } from './usuario-invitado/usuario-invitado.module';

@Module({
    imports: [UsuarioModule, EmpresaModule, CursoComplementarioModule, HorarioModule, SolicitudModule, AmbienteModule, AreaFormacionModule, ListasModule, AuthModule, RolModule, UsuarioInvitadoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
