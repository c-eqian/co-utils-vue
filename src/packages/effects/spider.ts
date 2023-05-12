import { Partial } from '@/packages/helper';

export interface ISpiderOptions {
  zIndex: number;
  opacity: number;
  color: string;
  count: number;
}
/**
 * 蜘蛛网特效
 * 返回关闭函数
 */
export const useSpiderEffects = (options?: Partial<ISpiderOptions>) => {
  const defaultOptions = {
    zIndex: -1,
    opacity: 0.5,
    color: '0,0,0',
    count: 99
  };
  const _options = Object.assign(defaultOptions, options);
  function n(n, e, t) {
    return n.getAttribute(e) || t;
  }

  function e(n) {
    return document.getElementsByTagName(n);
  }

  function t() {
    let t = e('script'),
      o = t.length,
      i = t[o - 1];
    return {
      l: o,
      z: n(i, 'zIndex', _options.zIndex),
      o: n(i, 'opacity', _options.opacity),
      c: n(i, 'color', _options.color),
      n: n(i, 'count', _options.count)
    };
  }

  function o() {
    (a = m.width =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
      (c = m.height =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
  }

  function i() {
    r?.clearRect(0, 0, a, c);
    let n, e, t, o, m, l;
    s.forEach(function (i: any, x) {
      for (
        i.x += i.xa,
          i.y += i.ya,
          i.xa *= i.x > a || i.x < 0 ? -1 : 1,
          i.ya *= i.y > c || i.y < 0 ? -1 : 1,
          r?.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
          e = x + 1;
        e < u.length;
        e++
      ) {
        (n = u[e]),
          null !== n.x &&
            null !== n.y &&
            ((o = i.x - n.x),
            (m = i.y - n.y),
            (l = o * o + m * m),
            l < n.max &&
              (n === y && l >= n.max / 2 && ((i.x -= 0.03 * o), (i.y -= 0.03 * m)),
              (t = (n.max - l) / n.max),
              r?.beginPath(),
              (r!.lineWidth = t / 2),
              (r!.strokeStyle = 'rgba(' + d.c + ',' + (t + 0.2) + ')'),
              r?.moveTo(i.x, i.y),
              r?.lineTo(n.x, n.y),
              r?.stroke()));
      }
    }),
      x(i);
  }

  let a,
    c,
    u,
    m = document.createElement('canvas'),
    d = t(),
    l = 'c_n' + d.l,
    r = m.getContext('2d'),
    x =
      window.requestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).oRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame ||
      function (n) {
        window.setTimeout(n, 1e3 / 45);
      },
    w = Math.random,
    y = { x: null, y: null, max: 2e4 };
  (m.id = l),
    (m.style.cssText = 'position:fixed;top:0;left:0;z-index:' + d.z + ';opacity:' + d.o),
    e('body')[0].appendChild(m),
    o(),
    (window.onresize = o),
    (window.onmousemove = function (n) {
      (n = n || window.event), (y.x = n.clientX), (y.y = n.clientY);
    }),
    (window.onmouseout = function () {
      (y.x = null), (y.y = null);
    });
  for (var s: any[] = [], f = 0; d.n > f; f++) {
    let h = w() * a,
      g = w() * c,
      v = 2 * w() - 1,
      p = 2 * w() - 1;
    s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 });
  }
  (u = s.concat([y])),
    setTimeout(function () {
      i();
    }, 100);
  return () => {
    e('body')[0]?.removeChild(m);
  };
};
