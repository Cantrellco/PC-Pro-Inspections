import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  /** Tilt in degrees; negative lifts the fly end. 0 for bands and chips. */
  angle?: number;
  /** Which part of the flag a short, wide box shows. */
  anchor?: "center" | "top";
};

/**
 * Full-bleed animated U.S. flag rendered on a <canvas>.
 *
 * Pipeline (tuned for performance):
 *  1. The flag is drawn to an offscreen canvas at high resolution (official
 *     13-stripe / 50-star geometry), graded toward the site's dark heritage
 *     palette.
 *  2. Each frame it's composited into an intermediate buffer with a slow
 *     travelling vertical displacement (wide slices). The cloth lighting is
 *     baked into a 1px-tall "shade row" that is stretched over the buffer in a
 *     single draw — instead of thousands of full-height fillRects.
 *  3. That buffer is drawn to the screen rotated, so the flag streams up toward
 *     the upper-right corner.
 *
 * Honors `prefers-reduced-motion` (single static frame) and pauses when hidden.
 */
export default function WavingFlag({ className = '', angle = -14, anchor = 'center' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Tilt: negative angle lifts the fly end (right) upward → flows up-right.
    const ANGLE = (angle * Math.PI) / 180;
    const cosA = Math.abs(Math.cos(ANGLE));
    const sinA = Math.abs(Math.sin(ANGLE));
    const OVERSCAN = 1.08;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const flag = document.createElement('canvas');
    const fctx = flag.getContext('2d');
    const waved = document.createElement('canvas');
    const wx = waved.getContext('2d');
    if (!fctx || !wx) return;

    let WW = 0;
    let WH = 0;
    let FW = 0;
    let FH = 0;
    let step = 6; // wave slice width (px) — scaled to the buffer size

    const buildFlag = (targetW: number) => {
      FW = Math.min(Math.max(Math.round(targetW), 900), 2200);
      FH = Math.round(FW / 1.9);
      flag.width = FW;
      flag.height = FH;
      drawFlag(fctx, FW, FH);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const cssW = parent ? parent.clientWidth : window.innerWidth;
      const cssH = parent ? parent.clientHeight : window.innerHeight;
      const W = Math.max(1, Math.round(cssW * dpr));
      const H = Math.max(1, Math.round(cssH * dpr));
      canvas.width = W;
      canvas.height = H;

      const reqW = (W * cosA + H * sinA) * OVERSCAN;
      const reqH = (W * sinA + H * cosA) * OVERSCAN;
      WW = Math.min(Math.ceil(Math.max(reqW, reqH * 1.9)), 2600);
      WH = Math.round(WW / 1.9);
      waved.width = WW;
      waved.height = WH;

      step = Math.max(4, Math.ceil(WW / 420)); // ~420 wave slices, regardless of size
      buildFlag(WW);
      // Always repaint once after a resize, even while the loop is parked
      // off-screen; otherwise a resize leaves a blank canvas until it scrolls
      // back into view.
      if (!raf) render();
    };

    let raf = 0;
    let t = 0;
    let visible = true; // tracks whether the hero canvas is in the viewport
    const SPEED = 0.01; // phase advance per frame — slow, but noticeable
    const waveLen = 2.1; // waves across the flag

    const renderWaved = () => {
      wx.clearRect(0, 0, WW, WH);
      const drawH = WH * 1.25; // vertical overscan so the wave never reveals edges
      const baseY = (WH - drawH) / 2;
      const amp = WH * 0.07;

      // 1) Vertical wave displacement, in wide slices.
      for (let xs = 0; xs < WW; xs += step) {
        const u = xs / WW;
        const localAmp = amp * (0.18 + 0.82 * u);
        const phase = u * waveLen * Math.PI * 2 - t * SPEED;
        const offset =
          Math.sin(phase) * localAmp + Math.sin(phase * 0.5 + 1.3) * localAmp * 0.4;
        const srcSliceW = Math.max(1, (step / WW) * FW);
        wx.drawImage(flag, u * FW, 0, srcSliceW, FH, xs, baseY + offset, step + 1, drawH);
      }

    };

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;

      renderWaved();

      ctx.clearRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(ANGLE);
      const coverScale = Math.max((W * cosA + H * sinA) / WW, (W * sinA + H * cosA) / WH);
      const dw = WW * coverScale;
      const dh = WH * coverScale;
      // Anchor: a short wide band shows the top of the flag (canton + stripes)
      // instead of a slice through its middle.
      const dy = anchor === 'top' ? -H / 2 - dh * 0.02 : -dh / 2;
      ctx.drawImage(waved, -dw / 2, dy, dw, dh);
      ctx.restore();

      // Only keep the loop alive while the hero is on-screen and the tab is
      // visible — otherwise this burns the main thread for an invisible canvas.
      if (!reduce && visible && !document.hidden) {
        t += 1;
        raf = requestAnimationFrame(render);
      } else {
        raf = 0; // mark stopped so start() can safely re-arm
      }
    };

    // Single funnel for (re)starting the loop. Guards against double-scheduling
    // (which would spawn parallel rAF loops and double the cost) by only arming
    // when no frame is pending.
    const start = () => {
      if (reduce || !visible || document.hidden) return;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    // Pause when the hero scrolls out of view (a small rootMargin resumes it
    // just before it re-enters, so there's no visible snap). `t` is preserved,
    // so the wave continues seamlessly from where it left off.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0, rootMargin: '200px' },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [angle, anchor]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

/** Draws an official-geometry U.S. flag cut as a woodblock: flat brand inks,
 *  a black keyblock line between every stripe and around the canton, and the
 *  stars cut in paper. The wave displacement alone carries the cloth. */
function drawFlag(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const RED = '#c8102e'; // brand red, flat
  const WHITE = '#f4efe4'; // shell paper
  const NAVY = '#0a3161'; // brand navy, flat
  const STAR = '#f4efe4';

  const KEY = '#111111';
  const line = Math.max(2, Math.round(H / 110)); // keyblock weight scales with the print
  const stripeH = H / 13;
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = i % 2 === 0 ? RED : WHITE;
    ctx.fillRect(0, i * stripeH, W, stripeH + 1);
  }
  // Misregistered red: a hair of red peeking above each red stripe's keyline.
  ctx.fillStyle = RED;
  for (let i = 0; i < 13; i += 2) ctx.fillRect(0, i * stripeH - line * 0.6, W, line * 0.6);
  // Keyblock lines between stripes.
  ctx.fillStyle = KEY;
  for (let i = 1; i < 13; i++) ctx.fillRect(0, i * stripeH - line / 2, W, line);
  ctx.fillRect(0, 0, W, line);
  ctx.fillRect(0, H - line, W, line);

  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, cantonW, cantonH);
  ctx.fillStyle = KEY;
  ctx.fillRect(cantonW - line / 2, 0, line, cantonH + line / 2);
  ctx.fillRect(0, cantonH - line / 2, cantonW, line);

  const mx = cantonW / 12;
  const my = cantonH / 10;
  const r = mx * 0.42;
  for (let row = 0; row < 9; row++) {
    const even = row % 2 === 0;
    const count = even ? 6 : 5;
    const startCol = even ? 1 : 2;
    const cy = my * (row + 1);
    for (let s = 0; s < count; s++) {
      const cx = mx * (startCol + s * 2);
      ctx.fillStyle = KEY;
      drawStar(ctx, cx + r * 0.16, cy + r * 0.16, 5, r, r * 0.42); // keyblock, offset
      ctx.fillStyle = STAR;
      drawStar(ctx, cx, cy, 5, r, r * 0.42);
    }
  }
}

/** Filled 5-point star centered at (cx, cy). */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outer: number,
  inner: number,
) {
  let rot = -Math.PI / 2;
  const stepAng = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
  for (let i = 0; i < spikes; i++) {
    rot += stepAng;
    ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
    rot += stepAng;
    ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
  }
  ctx.closePath();
  ctx.fill();
}
