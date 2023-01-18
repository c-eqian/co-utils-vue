/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-29 09:36:50
 * @LastEditors: C99017 2429120006@qq.com
 * @LastEditTime: 2022-12-29 17:21:10
 */

export type Callback = (e: Event) => void;
export type MessageCallback<T> = (e: T) => void;

export interface ICoSocketOptions<T> {
  url: string | null; // 链接的通道的地址
  protocols?: string | string[]; // 通信协议
  heartTime?: number; // 心跳时间间隔
  heartMessage?: string; // 心跳信息,默认为'ping'
  isOpenHeart?: boolean; // 是否开启心跳
  isReconnect?: boolean; // 是否自动重连
  reconnectTime?: number; // 重连时间间隔
  reconnectCount?: number; // 重连次数 -1 则不限制
  openCallBack?: Callback; // 连接成功的回调
  closeCallBack?: Callback; // 关闭的回调
  messageCallBack?: MessageCallback<T>; // 消息的回调
  errorCallBack?: Callback; // 错误的回调
}
export interface IResponseMessage<T> {
  code: number;
  message: string;
  data?: T;
}
