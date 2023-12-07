import {createParamDecorator, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ConfigService} from "@nestjs/config";
import {FrontendApi} from "@ory/client";
import {ORY_STRATEGY} from "./auth.constants";
import {OrySecrets} from "../secrets/ory.config";
import {Request} from 'express'

@Injectable()
export class OryOauthGuard extends AuthGuard(ORY_STRATEGY) {
    private readonly orySecrets: OrySecrets;
    private readonly jwk: FrontendApi;

    constructor(
        private readonly cfg: ConfigService,
    ) {
        super();
        this.orySecrets = cfg.getOrThrow('ory') as OrySecrets;
        console.log(this.orySecrets.oryBasePath);
        this.jwk = new FrontendApi({
            basePath: this.orySecrets.oryBasePath,
            accessToken: this.orySecrets.oryAccessToken,
            isJsonMime: (mime: string) => /^application\/json/.test(mime),
        });
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.headers.authorization)
        request.session = await this.jwk.toSession({
            xSessionToken: request.headers.authorization,
        }, {
            headers: request.headers,
        }).then((res) => res.data)
        if (!request.session.identity) {
            return false;
        }
        if (request.session.identity.state !== 'active') {
            throw new UnauthorizedException('User is not active');
        }
        return true;
    }
}

export const GetSession = createParamDecorator(
    (data: keyof Request['session'] | undefined, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
        if (data) {
            return request.session[data];
        }
        return request.session;
    },
);

