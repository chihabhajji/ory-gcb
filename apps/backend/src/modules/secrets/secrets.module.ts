import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import oryConfig from "./ory.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            expandVariables: true,
            load: [oryConfig],
        }),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class SecretsModule {}
