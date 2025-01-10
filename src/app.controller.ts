import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // 使用 GET 装饰器标记 index 方法为处理 GET 请求的处理程序
  @Get()
  index() {
    return 'Hello World!';
  }
  @Get('info')
  main() {
    return 'main';
  }
}
