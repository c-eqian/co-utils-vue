/**
 * @Author: 十三
 * @Date: 2024/1/16
 * @FileName: index.ts
 * @email: 2429120006@qq.com
 * @Description: desc
 */
import { ref, Ref, getCurrentScope, onScopeDispose } from 'vue-demi';
import { isFunction } from '@/packages/is/isFunction';
import { isNumeric } from '@/packages/is/isNumber';
const DEFAULT_PING_MESSAGE = 'ping';

export interface ISocketOptions {
  /**
   * 通信协议
   */
  protocols?: string | string[];
  /**
   * 心跳时间间隔
   * @default 5000
   */
  heartTime?: number;
  /**
   * 心跳信息
   * @default ping
   */
  heartMessage?: string;
  /**
   * 自动关闭
   */
  autoClose?: boolean;
  /**
   * 是否自动重连
   * @default true
   */
  isReconnect?: boolean;
  /**
   * 重连时间间隔
   * @default 5000
   */
  reconnectTime?: number;
  /**
   *  重连次数
   *  可以是数值或者返回一个boolean
   *  @default -1
   */
  reconnectCount?: number | (() => boolean);
  /**
   * 连接成功地回调
   * @param ws
   */
  onOpen?: (ws: WebSocket) => void;
  /**
   * 关闭的回调
   * @param ws
   * @param e
   */
  onClose?: (ws: WebSocket, e: CloseEvent) => void;
  /**
   * 消息的回调
   * @param ws
   * @param e
   */
  onMessage?: (ws: WebSocket, e: MessageEvent) => void;
  /**
   * 错误的回调
   * @param ws
   * @param e
   */
  onError?: (ws: WebSocket, e: Event) => void;
  /**
   * 重连失败回调
   */
  onFailed?: () => void;
}
export interface ISocketReturn<T> {
  data?: Ref<T | null>;
  close: WebSocket['close'];
  open: () => void;
  send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean) => boolean;
  ws: Ref<WebSocket | undefined>;
}
export const useWebSocket = <Data = any>(
  url: string,
  options: ISocketOptions = {}
): ISocketReturn<Data> => {
  const {
    onOpen,
    onClose,
    onFailed,
    onError,
    onMessage,
    heartMessage = DEFAULT_PING_MESSAGE,
    heartTime = 5000,
    reconnectCount = -1,
    reconnectTime = 5000,
    isReconnect = true,
    autoClose = true,
    protocols = []
  } = options;
  const wsRef = ref<WebSocket | undefined>();
  const data: Ref<Data | null> = ref(null);
  let bufferedData: (string | ArrayBuffer | Blob)[] = [];
  let intervalTime: ReturnType<typeof setInterval> | undefined;
  // 进行重连次数
  let retriedCount = 0;
  // 是否主动关闭，如果主动关闭，则不会进行重连
  let explicitlyClose = false;
  const _init = () => {
    if (wsRef.value) return;
    const ws = new WebSocket(url, protocols);
    wsRef.value = ws;
    ws.onopen = () => {
      isFunction(onOpen) && onOpen?.(ws!);
      _heartbeatDetection();
      _sendBufferData();
    };
    ws.onclose = ev => {
      wsRef.value = undefined;
      isFunction(onClose) && onClose?.(ws, ev);
      // 非主动关闭，且配置自动重连
      if (!explicitlyClose && isReconnect) {
        retriedCount += 1;
        if (
          (isNumeric(reconnectCount) && (+reconnectCount < 0 || retriedCount < +reconnectCount)) ||
          (typeof reconnectCount === 'function' && reconnectCount())
        ) {
          setTimeout(_init, reconnectTime);
        } else {
          _reset();
          isFunction(onFailed) && onFailed?.();
        }
      }
    };
    ws.onerror = ev => {
      isFunction(onError) && onError?.(ws!, ev);
    };
    ws.onmessage = e => {
      if (isReconnect) {
        // 正常收到数据，说明连接正确，重置心跳
        _heartbeatDetection();
        if (e.data === heartMessage) return;
      }
      data.value = e.data;
      isFunction(onMessage) && onMessage?.(ws!, e);
    };
  };
  /**
   * 发送缓存数据
   */
  const _sendBufferData = () => {
    bufferedData.forEach(data => {
      wsRef.value?.send(data);
    });
    bufferedData = [];
  };
  const send = (data: string | ArrayBuffer | Blob, buffer = true) => {
    /**
     * 未连接状态，缓存数据，下次连接成功重新发送
     */
    if (!wsRef.value || wsRef.value?.readyState !== wsRef.value?.OPEN) {
      if (buffer) bufferedData.push(data);
      return false;
    }
    _sendBufferData();
    wsRef.value?.send(data);
    return true;
  };
  // 重置
  const _reset = () => {
    intervalTime && clearInterval(intervalTime);
    intervalTime = undefined;
  };
  const close: WebSocket['close'] = (code = 1000, reason?: string) => {
    explicitlyClose = true;
    _reset();
    wsRef.value?.close(code, reason);
    wsRef.value = undefined;
  };
  const _heartbeatDetection = () => {
    _reset();
    if (isReconnect) {
      intervalTime = setInterval(() => {
        // 发送心跳包
        send(heartMessage, false);
      }, heartTime);
    }
  };
  const open = () => {
    close();
    explicitlyClose = false;
    retriedCount = 0;
    _init();
  };
  if (autoClose) {
    window.addEventListener('beforeunload', () => close());
    if (getCurrentScope()) {
      onScopeDispose(close);
    }
  }
  return {
    data,
    send,
    close,
    open,
    ws: wsRef
  };
};
