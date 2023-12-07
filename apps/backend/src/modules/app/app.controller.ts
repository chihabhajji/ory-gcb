import {Controller, Get, UseGuards} from '@nestjs/common';

import {AppService} from './app.service';
import {ApiOAuth2} from "@nestjs/swagger";
import {GetSession, OryOauthGuard} from "../auth/auth.guard";
import {AppDto} from "./app.dto";
import {Identity, IdentityApi, OidcUserInfo} from "@ory/client";
import {ConfigService} from "@nestjs/config";
import {OrySecrets} from "../secrets/ory.config";


@ApiOAuth2(['email', 'profile'])
@UseGuards(OryOauthGuard)
@Controller()
export class AppController {
    private readonly identityApi: IdentityApi;

    constructor(
        private readonly configService: ConfigService,
        private readonly appService: AppService,
    ) {
        const config = configService.getOrThrow('ory') as OrySecrets;
        this.identityApi = new IdentityApi({
            basePath: config.oryBasePath,
            accessToken: config.oryAccessToken,
            isJsonMime(mime: string): boolean {
                return 'application/json' === mime || 'application/json; charset=utf-8' === mime
            }
        })
    }

    @Get()
    getData(): AppDto {
        return this.appService.getData();
    }

    @Get('test')
    async getTest(
        @GetSession() identity: OidcUserInfo,
    ): Promise<Identity> {
        return await this.identityApi.getIdentity({
            id: identity.sub
        }).then(res => res.data)
    }
}
