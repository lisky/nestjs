import 'reflect-metadata';

import { Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { Logger } from './logger';

import path = require('path');
const express = require('express');

export class NestApplication {
  // 在它内部私有化一个 Express实例
  private readonly app: Express = express();
  constructor(protected readonly module: any) {}
  // 配置初始化工作
  async init() {
    // 取出模块里所有的控制器，然后做好路径配置
    const controllers = Reflect.getMetadata('controllers', this.module) || [];
    Logger.log(`Application dependencies initalized`, 'InstanceLoader');
    // 路由映射的核心是知道什么样的请求方法，什么样的路径，对应哪个处理函数
    for (const Controller of controllers) {
      // 创建每个控制器的实例
      const controller = new Controller();
      // 获取控制的路径前缀
      const perfix = Reflect.getMetadata('perfix', Controller) || '/';
      // 获取控制器的原型对象
      const controllerProperty = Controller.prototype;
      // 开始解析路由
      Logger.log(`${Controller.name} {${perfix}}`, 'RoutesResolver');
      //  遍历类的原型上的方法名
      for (const methodName of Object.getOwnPropertyNames(controllerProperty)) {
        // 获取原型上的方法 index 函数
        const method = controllerProperty[methodName];
        // 取得此函数上绑定的方法名的元数据
        const httpMethod = Reflect.getMetadata('method', method);
        // 取得此函数上绑定的路径的元数据
        const pathMetadata = Reflect.getMetadata('path', method);

        if (httpMethod) {
          // 拼出来完整的路由路径
          const routePath = path.posix.join('/', perfix, pathMetadata);
          // 配置路由，当客户端以 httpMethod 方法访问 routePath 路径时，调用对应的函数处理请求
          this.app[httpMethod.toLowerCase()](routePath, async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
            const args = this.resolveParams(controller, methodName, req, res, next);
            const result = await method.call(controller, ...args);
            res.send(result);
          });
          Logger.log(`Mapped {${routePath}, ${httpMethod}} route`, 'RoutesResolver');
        }
      }
    }

    Logger.log(`Nest application successfully started`, 'NestApplication');
  }

  private resolveParams(instance: any, methodName: string, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    // 取出参数的元数据
    const paramsMetaData = Reflect.getMetadata('params', instance, methodName);
    return paramsMetaData
      .sort((a, b) => a.parameterIndex - b.parameterIndex)
      .map((params) => {
        const { key } = params;
        switch (key) {
          case 'Request':
          case 'Req':
            return req;
          case 'Response':
            return res;
          default:
            return null;
        }
      });
    // [{ parameterIndex: 0, key: 'Req' }, { parameterIndex: 1, key: 'Request' }]
  }

  // 启动 HTTP 服务器
  async listen(port: number) {
    await this.init();
    // 调用 express 实例的 listen 方法启动 HTTP 服务器，监听 port 端口
    this.app.listen(port, () => Logger.log(`Application is running on http://localhost:${port}`, 'NestApplication'));
  }
}
