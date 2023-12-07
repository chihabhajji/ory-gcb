import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './options';
import providers, { tokens } from './providers';

@Module({
  providers: [...providers],
  exports: [...tokens],
})
export class OryHydraClientModule extends ConfigurableModuleClass {}
