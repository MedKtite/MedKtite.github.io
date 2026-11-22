import {
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core';

interface Ring {
  x: number;
  y: number;
  born: number;
}
const MAX_DPR = 2;
const TAU = Math.PI * 2;

/** A viewport-sized decorative layer; Angular content stays above it. */
@Component({
  selector: 'app-sonar-background',
  standalone: true,
  template: '<canvas #canvas aria-hidden="true"></canvas>',
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        color: var(--ink-soft);
        opacity: 0.45;
      }
    `,
  ],
})
export class SonarBackgroundComponent {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const host = this.element.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const options = {
      spacing: 26,
      dotRadius: 1.2,
      baseOpacity: 0.14,
      pingEvery: 3.6,
      speed: 260,
      ringWidth: 90,
      amplitude: 1.6,
      interactive: true,
      maxRings: 6,
      seedPing: true,
      pingArea: [0.15, 0.2, 0.85, 0.8],
    };
    let rings: Ring[] = [];
    let refresh = () => {};
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0,
      height = 0,
      raf = 0,
      timer = 0;
    let visible = true,
      seeded = false,
      stroke = '';
    let nextPing = performance.now() + options.pingEvery * 1000;
    const readColor = () => {
      stroke = getComputedStyle(canvas).color;
    };
    const addRing = (x: number, y: number, born: number) => {
      readColor();
      rings.push({ x, y, born });
      while (rings.length > options.maxRings) rings.shift();
    };
    const draw = (now: number) => {
      const o = options;
      const lifetime = (Math.hypot(width, height) + o.ringWidth) / o.speed;
      rings = rings.filter((r) => (now - r.born) / 1000 < lifetime);
      const live = rings.map((r) => {
        const age = (now - r.born) / 1000;
        const radius = age * o.speed;
        return { ...r, radius, reach: radius + o.ringWidth, fade: 1 - age / lifetime };
      });
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = stroke;
      const cols = Math.ceil(width / o.spacing) + 1;
      const rows = Math.ceil(height / o.spacing) + 1;
      const offsetX = (width - (cols - 1) * o.spacing) / 2;
      const offsetY = (height - (rows - 1) * o.spacing) / 2;
      const hot: number[] = [];
      ctx.globalAlpha = o.baseOpacity;
      ctx.beginPath();
      for (let i = 0; i < cols; i++) {
        const cx = offsetX + i * o.spacing;
        for (let j = 0; j < rows; j++) {
          const cy = offsetY + j * o.spacing;
          let energy = 0;
          for (const r of live) {
            if (Math.abs(cx - r.x) > r.reach || Math.abs(cy - r.y) > r.reach) continue;
            const dist = Math.abs(Math.hypot(cx - r.x, cy - r.y) - r.radius);
            if (dist >= o.ringWidth) continue;
            const t = 1 - dist / o.ringWidth;
            energy = Math.max(energy, t * t * (3 - 2 * t) * r.fade);
          }
          if (energy < 0.01) {
            ctx.moveTo(cx + o.dotRadius, cy);
            ctx.arc(cx, cy, o.dotRadius, 0, TAU);
          } else hot.push(cx, cy, energy);
        }
      }
      ctx.fill();
      for (let k = 0; k < hot.length; k += 3) {
        const energy = hot[k + 2] ?? 0;
        ctx.globalAlpha = o.baseOpacity + (1 - o.baseOpacity) * energy;
        ctx.beginPath();
        ctx.arc(hot[k] ?? 0, hot[k + 1] ?? 0, o.dotRadius * (1 + o.amplitude * energy), 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!seeded) {
        seeded = true;
        const [x0, y0, x1, y1] = options.pingArea;
        if (options.seedPing && !reduceMotion.matches)
          addRing(
            width * (x0 + (x1 - x0) * 0.68),
            height * (y0 + (y1 - y0) * 0.34),
            performance.now() - 500,
          );
      }
      if (reduceMotion.matches) rings = [];
      draw(performance.now());
    };
    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      if (reduceMotion.matches) {
        rings = [];
        draw(now);
        return;
      }
      const o = options;
      if (o.pingEvery > 0 && now >= nextPing) {
        const [x0, y0, x1, y1] = o.pingArea;
        addRing(
          width * (x0 + Math.random() * (x1 - x0)),
          height * (y0 + Math.random() * (y1 - y0)),
          now,
        );
        nextPing = now + o.pingEvery * 1000;
      }
      draw(now);
      if (rings.length) raf = requestAnimationFrame(tick);
      else if (o.pingEvery > 0)
        timer = window.setTimeout(() => tick(performance.now()), Math.max(16, nextPing - now));
    };
    const wake = () => {
      if (!raf) {
        window.clearTimeout(timer);
        raf = requestAnimationFrame(tick);
      }
    };
    refresh = () => {
      readColor();
      nextPing = performance.now() + options.pingEvery * 1000;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (!options.interactive || reduceMotion.matches) return;
      const rect = host.getBoundingClientRect();
      addRing(e.clientX - rect.left, e.clientY - rect.top, performance.now());
      wake();
    };
    const onVisibility = () => {
      if (!document.hidden) wake();
    };
    const ro = new ResizeObserver(resize);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) wake();
      },
      { threshold: 0 },
    );
    const mo = new MutationObserver(() => refresh());
    readColor();
    resize();
    ro.observe(host);
    io.observe(host);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reduceMotion.addEventListener('change', wake);
    wake();
    this.destroyRef.onDestroy(() => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('visibilitychange', onVisibility);
      reduceMotion.removeEventListener('change', wake);
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      rings = [];
    });
  }
}
