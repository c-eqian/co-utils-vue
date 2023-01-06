/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-29 09:32:48
 * @LastEditors: C99017 2429120006@qq.com
 * @LastEditTime: 2022-12-29 17:28:18
 */
import * as _ from './type';

export class CoSocket<T = any, P = any> {
  private ws: WebSocket;

  private reconnectTimer: NodeJS.Timeout; // 重连定时器

  private reconnectCount = 10; // 重连次数

  private heartTimeOut: number; // 心跳计时

  private ServerHeartbeatTimeout: number;

  // 默认配置
  defaultOptions: _.ICoSocketOptions<P> = {
    url: null, // 通道地址
    heartTime: 5000, // 心跳间隔时间
    heartMessage: 'ping',
    isReconnect: true, // 是否自动重连
    reconnectTime: 5000, // 重连时间间隔
    reconnectCount: 5, // 重连次数 -1 则不限制
    openCallBack: (_e: Event) => {
      console.log('openCallBack', _e);
    }, // 连接成功的回调
    closeCallBack: (_e: Event) => {
      console.log('closeCallBack', _e);
    }, // 关闭的回调
    messageCallBack: (_e: P) => {
      console.log('messageCallBack', _e);
    }, // 消息的回调
    errorCallBack: (_e: Event) => {
      console.log('errorCallBack', _e);
    } // 错误的回调
  };

  constructor(options: _.ICoSocketOptions<P>) {
    Object.assign(this.defaultOptions, options);
    this.createConnect();
  }

  private createConnect() {
    if (!('WebSocket' in window)) {
      throw new Error('当前浏览器不支持 WebSocket');
    }
    if (!this.defaultOptions.url) throw new Error('url未定义， 无法使用');
    this.ws = this.defaultOptions.protocols
      ? new WebSocket(this.defaultOptions.url, this.defaultOptions.protocols)
      : new WebSocket(this.defaultOptions.url);
    this.onopen(this.defaultOptions.openCallBack as _.Callback);
    this.onclose(this.defaultOptions.closeCallBack as _.Callback);
    this.onmessage(this.defaultOptions.messageCallBack as _.MessageCallback<P>);
  }

  /**
   * 自定义连接成功的回调事件
   * @param callback
   */
  onopen(callback: _.Callback) {
    // TODO:
    this.ws.onopen = event => {
      clearTimeout(this.reconnectTimer); // 连接成功，清除重连定时器
      this.defaultOptions.reconnectCount = this.reconnectCount; // 重置重连计数器
      // 心跳机制建立
      this.reset();
      this.start(() => {
        this.send(this.defaultOptions.heartMessage as string);
      });
      // 如果是自定义连接成功的回调，执行传过来的回调事件
      if (typeof callback === 'function') {
        callback(event);
        return;
      }
      // 否则，执行默认事件
      typeof this.defaultOptions.openCallBack === 'function' &&
        this.defaultOptions.openCallBack(event);
    };
  }

  /**
   * 自定义关闭的回调事件
   * @param callback
   */
  onclose(callback: _.Callback) {
    // TODO:
    this.ws.onclose = event => {
      this.reset();
      // 如果不是销毁，进行重连
      this.defaultOptions.isReconnect && this.onReconnect();
      if (typeof callback === 'function') {
        callback(event);
        return;
      }
      typeof this.defaultOptions.closeCallBack === 'function' &&
        this.defaultOptions.closeCallBack(event);
    };
  }

  /**
   * 自定义连接错误事件
   * @param callback
   */
  onerror(callback: _.Callback): void {
    // TODO:
    this.ws.onerror = event => {
      if (typeof callback === 'function') {
        callback(event);
        return;
      }
      typeof this.defaultOptions.errorCallBack === 'function' &&
        this.defaultOptions.errorCallBack(event);
    };
  }

  /**
   * 自定义消息事件
   * @param callback
   */
  onmessage(callback: _.MessageCallback<P>) {
    // TODO:
    this.ws.onmessage = (event: MessageEvent) => {
      if (event.data === this.defaultOptions.heartMessage) {
        // 收到消息， 说明心跳正常，进行相关重置
        this.reset();
        this.start(() => {
          this.send(this.defaultOptions.heartMessage as string);
        });
      } else {
        if (typeof callback === 'function') {
          callback(event.data);
          return;
        }
        typeof this.defaultOptions.messageCallBack === 'function' &&
          this.defaultOptions.messageCallBack(event.data);
      }
    };
  }

  /**
   * 自定义发送消息事件
   * @param data
   */
  send(data: T | string | ArrayBufferLike | Blob | ArrayBufferView) {
    // TODO:
    if (this.ws.readyState !== this.ws.OPEN) {
      throw new Error('未连接服务器，无法发送');
    }
    this.ws.send(data as string);
  }

  /**
   * 重连事件
   */
  private onReconnect() {
    // TODO:
    if (
      (this.defaultOptions.reconnectCount && this.defaultOptions.reconnectCount > 0) ||
      this.defaultOptions.reconnectCount === -1
    ) {
      this.reconnectTimer = setTimeout(() => {
        this.createConnect();
        if (this.defaultOptions.reconnectCount !== -1) {
          this.defaultOptions.reconnectCount = (this.defaultOptions.reconnectCount as number) - 1;
        }
      }, this.defaultOptions.reconnectTime);
    } else {
      this.reconnectTimer && clearTimeout(this.reconnectTimer);
      this.defaultOptions.reconnectCount = this.reconnectCount;
    }
  }

  /**
   * 销毁事件
   */
  destroy() {
    // TODO:
    this.reset();
    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.defaultOptions.isReconnect = false;
    this.ws.close();
  }

  // 重置
  private reset() {
    this.heartTimeOut && clearTimeout(this.heartTimeOut);
    this.ServerHeartbeatTimeout && clearTimeout(this.ServerHeartbeatTimeout);
  }

  /**
   * 开启心跳
   */
  private start(callback: _.Callback) {
    this.heartTimeOut = setTimeout((e: Event) => {
      callback(e);
      this.ServerHeartbeatTimeout = setTimeout((ev: Event) => {
        callback(ev);
        // 重新检测
        this.reset();
        this.start(callback);
      }, this.defaultOptions.heartTime);
    }, this.defaultOptions.heartTime);
  }
}
