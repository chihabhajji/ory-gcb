import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { OrySecrets } from '../modules/secrets/ory.config';

export default function swaggerInit(
    app: INestApplication,
    {oryBasePath, oryAppClientId, oryAppClientScopes}: OrySecrets,
) {
    const config = new DocumentBuilder()
        .addServer('http://localhost:4000', 'Development Proxy')
        .addServer('http://localhost:3000', 'Development')
        .setTitle('gcb-backend')
        .addOAuth2({
            name: 'oauth2',
            type: 'oauth2',
            scheme: 'securityScheme',
            description: 'OAuth2',
            flows: {
                implicit: {
                    authorizationUrl: `${oryBasePath}/oauth2/auth`,
                    scopes: oryAppClientScopes.reduce(
                        (acc, cur) => {
                            acc[cur] = cur;
                            return acc;
                        },
                        {} as Record<string, string>,
                    ),
                },
            },
        })
        .addSecurityRequirements('oauth2')
        .build();
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config), {
        yamlDocumentUrl: '/yaml',
        jsonDocumentUrl: '/json',
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
            oauth2RedirectUrl: 'http://localhost:4000/docs/oauth2-redirect.html',
            initOAuth: {
                clientId: oryAppClientId,
                scopes: oryAppClientScopes,
            },
        },
    });
}
