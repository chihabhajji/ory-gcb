import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import oryConfig, {OrySecrets} from "../secrets/ory.config";
import {PassportModule} from "@nestjs/passport";
import {ORY_STRATEGY} from "./auth.constants";
import {OryHydraClientModule} from "../../libs/ory/module";
import {OryOauthGuard} from "./auth.guard";
import {OryOauthStrategy} from "./auth.strategy";

@Module({
    imports: [
        ConfigModule.forFeature(oryConfig),
        PassportModule.register({ defaultStrategy: ORY_STRATEGY }),
        OryHydraClientModule.registerAsync({
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => {
                const options = cfg.getOrThrow('ory') as OrySecrets;
                return {
                    accessToken: options.oryAppClientSecret,
                    basePath: options.oryBasePath,
                };
            },
        }),
    ],
    controllers: [],
    providers: [
        OryOauthGuard,
        OryOauthStrategy
    ],
    exports: [
        OryOauthGuard,
        OryOauthStrategy
    ],
})
export class AuthModule {}