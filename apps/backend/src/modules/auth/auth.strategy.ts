import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-oauth2';
import {Injectable} from '@nestjs/common';
import {AccessToken} from "express-openid-connect";
import {OAuth2Api, OidcApi} from "@ory/client";
import {ConfigService} from "@nestjs/config";
import {ORY_STRATEGY} from "./auth.constants";
import {OrySecrets} from "../secrets/ory.config";

@Injectable()
export class OryOauthStrategy extends PassportStrategy(Strategy, ORY_STRATEGY) {
    private readonly oauth2: OidcApi

    constructor(secrets: ConfigService) {
        const configService = secrets.getOrThrow('ory') as OrySecrets
        super({
            authorizationURL: configService.authorizeUrl,
            tokenURL: configService.tokenUrl,
            clientID: configService.oryAppClientId,
            clientSecret: configService.oryAppClientSecret,
            issuer: configService.oryBasePath,
            scope: configService.oryAppClientScopes,
            grant_type: 'authorization_code',
        });
    }

    async validate(accessToken: AccessToken) {
        console.log(accessToken)
        return await new OAuth2Api().introspectOAuth2Token({
            token: accessToken.access_token
        });
    }
}
