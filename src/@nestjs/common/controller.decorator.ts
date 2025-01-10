import 'reflect-metadata';

interface ControllerOptions {
  perfix?: string;
}
// 可以给 Controller 传递路径的前缀
// 路径前缀可以为空，也可以写空字符串，也可以写一个非空字符串，也可以写成一个对象
export function Controller(): ClassDecorator; // 传空字符串
export function Controller(perfix: string): ClassDecorator; // 路径前缀
export function Controller(options: ControllerOptions): ClassDecorator; // 传递对象
export function Controller(perfixOrOptions?: string | ControllerOptions): ClassDecorator {
  let options: ControllerOptions = {};
  if (typeof perfixOrOptions === 'string') {
    options.perfix = perfixOrOptions;
  } else if (typeof perfixOrOptions === 'object') {
    options = perfixOrOptions;
  }

  // 这是一个类装饰器，装饰的控制是这个类
  return (target: Function) => {
    // 给控制器类添加 perfix 路径前缀的元数据
    Reflect.defineMetadata('perfix', options.perfix || '', target);
  };
}
