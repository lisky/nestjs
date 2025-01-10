import 'reflect-metadata';

export const createParamDecorator = (key: string) => {
  /**
   * @param target  控制器原型
   * @param propertyKey 方法名
   * @param parameterIndex 参数索引，先走 1 再走 0
   */
  // 此处返回的第一个返回是 createParamDecorator 的执行函数，第二个返回才是 @Request() 装饰器的函数
  return () => (target: any, propertyKey: string, parameterIndex: number) => {
    // 给控制器原型的propertyKey方法添加元数据
    // 属性名是 parmas:handleRequest，值是一个数组，数组的每一项是一个对象，表示哪个参数需要哪个装饰器
    const existingParameters = Reflect.getMetadata(`params`, target, propertyKey) || [];
    existingParameters.push({ parameterIndex, key });
    // existingParameters[parameterIndex] = key;
    console.log('existingParameters', existingParameters);
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey);
  };
};

export const Request = createParamDecorator('Request');
export const Req = createParamDecorator('Req');
