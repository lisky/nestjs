import { NestApplication } from './nest-application';
import { Logger } from './logger';

export class NestFactory {
  static async create(module: any) {
    // 启动 Nest 应用程序
    Logger.log('Starting Nest application...', 'NestFactory');
    // 创建 Nest 应用程序实例
    const app = new NestApplication(module);
    // 返回Nest应用程序实例
    return app;
  }
}
