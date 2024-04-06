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
import { RolModule } from './rol/rol.module'
import { UsuarioInvitadoModule } from './usuario-invitado/usuario-invitado.module'
import { MulterModule } from '@nestjs/platform-express'
import { multerConfig } from './config/multer.config'
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import * as path from 'path'

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'es',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: true,
            },
            resolvers: [{ use: QueryResolver, options: ['lang', 'locale', 'l'] }, AcceptLanguageResolver],
        }),
        UsuarioModule,
        EmpresaModule,
        CursoComplementarioModule,
        HorarioModule,
        SolicitudModule,
        AmbienteModule,
        AreaFormacionModule,
        ListasModule,
        AuthModule,
        RolModule,
        UsuarioInvitadoModule,
        MulterModule.register(multerConfig),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
