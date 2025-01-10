import 'reflect-metadata';

export function Get(path: string = ''): MethodDecorator {
  /**
   * target: 类的原型对象 AppController.prototype
   * propertyKey: 方法键名 index
   * descriptor: index 方法的属性描述符
   */
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 给 descriptor.value 也就是 index 函数添加元数据，元数据的名字叫 path，值为 path
    Reflect.defineMetadata('path', path, descriptor.value);
    // 给 descriptor.value 也就是 index 函数添加元数据，元数据的名字叫 method，值为 Get
    Reflect.defineMetadata('method', 'Get', descriptor.value);
  };
}
