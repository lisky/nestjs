// 从 'cli-color' 模块中导入 clc，用于在终端中输出彩色文字
import { green, yellow, white } from 'cli-color';

export class Logger {
  private static lastLogTime = Date.now();
  // 定义了一个用来打印日志的工具方法
  static log(message: string, context: string = '') {
    // 获取当前时间戳
    const timestamp = new Date().toLocaleString();
    // 获取当前的进程ID
    const pid = process.pid;
    const currentTime = Date.now();
    // 计算时间差
    const timeDiff = currentTime - this.lastLogTime;

    console.log(
      `${green('[Nest]')} ${green(pid.toString())}  ${green('-')} ${white(timestamp)}   ${green('LOG')} ${yellow(`[${context}]`)} ${green(message)} +${green(timeDiff)}ms`,
    );
    this.lastLogTime = currentTime;
  }
}
