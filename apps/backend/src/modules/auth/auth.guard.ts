import {createParamDecorator, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ConfigService} from "@nestjs/config";
import {OidcUserInfo,} from "@ory/client";
import {ORY_STRATEGY} from "./auth.constants";
import {Request} from 'express'
import axios from "axios";

@Injectable()
export class OryOauthGuard extends AuthGuard(ORY_STRATEGY) {

    constructor(
        private readonly cfg: ConfigService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        if (!token) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        const session = await axios.get<OidcUserInfo>(`${this.cfg.getOrThrow('ory').oryBasePath}/userinfo`, {
            headers: {
                authorization: token,
            }
        }).then(res => res.data)
        if(!session.sub) {
            throw new UnauthorizedException('User is not active');
        }
        if(!session.email_verified) {
            throw new UnauthorizedException('User email is not verified');
        }
        request.session = session;
        return true;
    }
}

export const GetSession = createParamDecorator(
    (data: keyof Request['session'] | undefined, ctx: ExecutionContext): OidcUserInfo => {
        const request: Request = ctx.switchToHttp().getRequest();
        if (data) {
            return request.session[data];
        }
        return request.session;
    },
);

