/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Descripttion:
 * @version:
 * @Author: 十三
 * @Date: 2022-12-05 14:18:24
 * @LastEditors: 十三
 * @LastEditTime: 2022-12-05 14:50:37
 */

/**
 * 是否全屏
 * @returns Boolean
 */
export const isFullscreen = () => {
  let isFull = false;
  if (document.fullscreenEnabled || (document as any).msFullscreenEnabled) {
    isFull = (window as any).fullScreen || (document as any).webkitIsFullScreen;
    if (isFull === undefined) {
      isFull = false;
    }
  }
  return isFull;
};

/**
 * 开启全屏
 * @returns Boolean
 */
export const useToFullScreen = (): boolean => {
  try {
    if (
      !document.fullscreenElement &&
      !(document as any).mozFullScreenElement &&
      !(document as any).webkitFullscreenElement &&
      !(document as any).msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).msRequestFullscreen) {
        (document.documentElement as any).msRequestFullscreen();
      } else if ((document.documentElement as any).mozRequestFullScreen) {
        (document.documentElement as any).mozRequestFullScreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        (document.documentElement as any).webkitRequestFullscreen(
          (Element as any).ALLOW_KEYBOARD_INPUT
        );
      }
    }
    return true;
  } catch (e: any) {
    console.error(e);
  }
  return false;
};

/**
 * 退出全屏
 * @returns Boolean
 */
export const useExitFullScreen = (): boolean => {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    }
    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
};
