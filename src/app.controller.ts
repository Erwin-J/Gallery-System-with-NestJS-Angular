import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Redirect()
  redirect(): any {
    return { url: '/home' };
  }
}
