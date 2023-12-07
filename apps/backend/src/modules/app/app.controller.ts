import {Controller, Get, UseGuards} from '@nestjs/common';

import { AppService } from './app.service';
import {ORY_STRATEGY} from "../auth/auth.constants";
import {AuthGuard} from "@nestjs/passport";
import {ApiOAuth2, ApiTags} from "@nestjs/swagger";
import {GetSession, OryOauthGuard} from "../auth/auth.guard";


@ApiOAuth2(['email', 'profile'])
@UseGuards(OryOauthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('test')
    getTest(
      @GetSession('identity') identity: Record<string, string>,
  ) {
        return identity;
    }
}
