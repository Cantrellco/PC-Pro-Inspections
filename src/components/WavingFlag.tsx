import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
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
export default function WavingFlag({ className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Tilt: negative angle lifts the fly end (right) upward → flows up-right.
    const ANGLE = (-14 * Math.PI) / 180;
    const cosA = Math.abs(Math.cos(ANGLE));
    const sinA = Math.abs(Math.sin(ANGLE));
    const OVERSCAN = 1.08;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const flag = document.createElement('canvas');
    const fctx = flag.getContext('2d');
    const waved = document.createElement('canvas');
    const wx = waved.getContext('2d');
    const shade = document.createElement('canvas'); // 1px-tall lighting strip
    shade.height = 1;
    const sx2 = shade.getContext('2d');
    if (!fctx || !wx || !sx2) return;

    let WW = 0;
    let WH = 0;
    let FW = 0;
    let FH = 0;
    let step = 6; // wave slice width (px) — scaled to the buffer size
    let shadeImg: ImageData | null = null;

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
      shade.width = WW;
      shadeImg = sx2.createImageData(WW, 1);

      step = Math.max(4, Math.ceil(WW / 420)); // ~420 wave slices, regardless of size
      buildFlag(WW);
      if (reduce) render();
    };

    let raf = 0;
    let t = 0;
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

      // 2) Cloth lighting: build a 1px row, stretch it over the buffer once.
      if (shadeImg) {
        const d = shadeImg.data;
        for (let x = 0; x < WW; x++) {
          const phase = (x / WW) * waveLen * Math.PI * 2 - t * SPEED;
          const sh = Math.cos(phase);
          const i = x * 4;
          if (sh >= 0) {
            d[i] = 245;
            d[i + 1] = 243;
            d[i + 2] = 238;
            d[i + 3] = sh * 0.16 * 255;
          } else {
            d[i] = 6;
            d[i + 1] = 10;
            d[i + 2] = 18;
            d[i + 3] = -sh * 0.34 * 255;
          }
        }
        sx2.putImageData(shadeImg, 0, 0);
        wx.drawImage(shade, 0, 0, WW, 1, 0, 0, WW, WH);
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
      ctx.drawImage(waved, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();

      if (!reduce) {
        t += 1;
        raf = requestAnimationFrame(render);
      }
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

/** Draws an official-geometry U.S. flag, graded to the site's heritage palette. */
function drawFlag(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const RED = '#a8112a'; // deepened Old Glory crimson
  const WHITE = '#ece6d8'; // warm bone, not pure white
  const NAVY = '#0a2a52'; // muted heritage navy
  const STAR = '#f1ebdd';

  const stripeH = H / 13;
  for (let i = 0; i < 13; i++) {
    ctx.fillStyle = i % 2 === 0 ? RED : WHITE;
    ctx.fillRect(0, i * stripeH, W, stripeH + 1);
  }

  const cantonW = W * 0.4;
  const cantonH = stripeH * 7;
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, cantonW, cantonH);

  const mx = cantonW / 12;
  const my = cantonH / 10;
  const r = mx * 0.42;
  ctx.fillStyle = STAR;
  for (let row = 0; row < 9; row++) {
    const even = row % 2 === 0;
    const count = even ? 6 : 5;
    const startCol = even ? 1 : 2;
    const cy = my * (row + 1);
    for (let s = 0; s < count; s++) {
      const cx = mx * (startCol + s * 2);
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
