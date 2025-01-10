import 'reflect-metadata';

interface ModuleMetadata {
  controllers: Function[];
}

// 定义模块装饰器
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    // 给模块类添加元数据，元数据的名字叫 controllers，值为 metadata.controllers
    Reflect.defineMetadata('controllers', metadata.controllers, target);
  };
}
