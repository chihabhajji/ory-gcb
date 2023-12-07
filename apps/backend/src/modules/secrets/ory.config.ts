import { registerAs } from '@nestjs/config';
import { IsArray, IsString, IsUrl } from 'class-validator';
export const ORY_SECRETS_TOKEN = 'ory_secrets';
export class OrySecrets {
  @IsString()
  oryAppName: string;
  @IsUrl()
  oryBasePath: string;
  @IsString()
  oryAccessToken: string;
  @IsString()
  oryAppClientId: string;
  @IsString()
  oryAppClientSecret: string;

  @IsUrl()
  authorizeUrl: string;
  @IsUrl()
  tokenUrl: string;
  @IsUrl()
  userInfoUrl: string;
  @IsUrl()
  introspectionUrl: string;
  @IsUrl()
  dynamicOauthClientsUrl: string;

  @IsArray()
  @IsString({ each: true })
  oryAppClientScopes: string[];

  @IsString()
    slug: string;
}
export default registerAs('ory', () =>
    ({
      oryAppName: process.env.ORY_APP_NAME,
      oryBasePath: process.env.ORY_SDK_TUNNEL_URL,
      oryAccessToken: process.env.ORY_SDK_TOKEN,
      oryAppClientId: process.env.ORY_APP_BACKEND_CLIENT_ID,
      oryAppClientSecret: process.env.ORY_APP_BACKEND_CLIENT_SECRET,
      authorizeUrl: process.env.ORY_AUTHORIZE_URL,
      tokenUrl: process.env.ORY_TOKEN_URL,
      userInfoUrl: process.env.ORY_USERINFO_URL,
      introspectionUrl: process.env.ORY_INTROSPECT_URL,
      dynamicOauthClientsUrl: process.env.ORY_DYN_CLIENT_URL,
      oryAppClientScopes: process.env.ORY_APP_CLIENT_SCOPES?.split(','),
      slug: process.env.ORY_PROJECT_SLUG,
    } as OrySecrets));
