import { Controller, Get, Req, Request } from '@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

@Controller('users')
export class UserController {
  // 使用 GET 装饰器标记 index 方法为处理 GET 请求的处理程序
  @Get('req')
  handleRequest(@Req() req: ExpressRequest, @Request() requset: ExpressRequest) {
    console.log(req.url);
    console.log(req.path);
    console.log(requset.method);
    return 'request';
  }
}
