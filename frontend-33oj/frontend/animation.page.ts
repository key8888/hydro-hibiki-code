(() => {
  // /**
  //  * キャンバスに描画する点
  //  */
  // interface Point {
  //   x: number;
  //   y: number;
  //   xa: number;
  //   ya: number;
  //   max: number;
  // }

  // /**
  //  * マウス座標用の型
  //  */
  // interface Mouse {
  //   x: number | null;
  //   y: number | null;
  //   max: number;
  // }

  // /**
  //  * 設定用の型
  //  */
  // interface Config {
  //   zIndex: number;
  //   opacity: number;
  //   color: string;
  //   count: number;
  // }

  // /**
  //  * 属性値を取得
  //  */
  // const getAttr = (
  //   el: HTMLElement,
  //   name: string,
  //   defaultValue: string | number
  // ): string | number => el.getAttribute(name) || defaultValue;

  // /**
  //  * ウィンドウサイズを更新
  //  */
  // const updateSize = (): void => {
  //   canvasWidth = canvas.width =
  //     window.innerWidth ||
  //     document.documentElement.clientWidth ||
  //     document.body.clientWidth;

  //   canvasHeight = canvas.height =
  //     window.innerHeight ||
  //     document.documentElement.clientHeight ||
  //     document.body.clientHeight;
  // };

  // /**
  //  * 描画関数
  //  */
  // const draw = (): void => {
  //   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  //   points.forEach((p, idx) => {
  //     // 点の移動
  //     p.x += p.xa;
  //     p.y += p.ya;

  //     // 画面の端で反射
  //     if (p.x > canvasWidth || p.x < 0) p.xa *= -1;
  //     if (p.y > canvasHeight || p.y < 0) p.ya *= -1;

  //     // 点を描画
  //     ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);

  //     // 他の点との接続線を描画
  //     for (let j = idx + 1; j < allPoints.length; j++) {
  //       const q = allPoints[j];

  //       // マウスが画面外の場合はスキップ
  //       if (q.x === null || q.y === null) continue;

  //       const dx = p.x - q.x;
  //       const dy = p.y - q.y;
  //       const dist = dx * dx + dy * dy;

  //       if (dist < q.max) {
  //         // マウス近くでは点を引き寄せる
  //         if (q === mouse && dist >= q.max / 2) {
  //           p.x -= dx * 0.03;
  //           p.y -= dy * 0.03;
  //         }

  //         // 距離に応じた透明度
  //         const alpha = (q.max - dist) / q.max;
  //         ctx.beginPath();
  //         ctx.lineWidth = alpha / 2;
  //         ctx.strokeStyle = `rgba(${config.color},${0.2 + alpha})`;
  //         ctx.moveTo(p.x, p.y);
  //         ctx.lineTo(q.x, q.y);
  //         ctx.stroke();
  //       }
  //     }
  //   });

  //   // 次のフレームを描画
  //   requestAnimationFrame(draw);
  // };

  // // ==============================
  // // 初期設定
  // // ==============================
  // let canvasWidth: number;
  // let canvasHeight: number;

  // const scripts = document.getElementsByTagName("script");
  // const lastScript = scripts[scripts.length - 1] as HTMLElement;

  // // 設定値を取得
  // const config: Config = {
  //   zIndex: Number(getAttr(lastScript, "zIndex", -1)),
  //   opacity: Number(getAttr(lastScript, "opacity", 0.5)),
  //   color: String(getAttr(lastScript, "color", "0,0,0")),
  //   count: Number(getAttr(lastScript, "count", 99)),
  // };

  // // canvas作成
  // const canvas: HTMLCanvasElement = document.createElement("canvas");
  // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // const canvasId = `c_n${scripts.length}`;

  // canvas.id = canvasId;
  // canvas.style.cssText = `
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: ${config.zIndex};
  //   opacity: ${config.opacity};
  // `;

  // const mainContainer = document.querySelector(".main");
  // if (!mainContainer) {
  //   throw new Error('".main" 要素が見つかりません');
  // }
  // mainContainer.appendChild(canvas);

  // // ウィンドウサイズを初期化
  // updateSize();
  // window.addEventListener("resize", updateSize);

  // // マウス座標の追跡
  // const mouse: Mouse = { x: null, y: null, max: 20000 };
  // window.addEventListener("mousemove", (e: MouseEvent) => {
  //   mouse.x = e.clientX;
  //   mouse.y = e.clientY;
  // });
  // window.addEventListener("mouseout", () => {
  //   mouse.x = null;
  //   mouse.y = null;
  // });

  // // ランダムな点を生成
  // const points: Point[] = Array.from({ length: config.count }, () => {
  //   const x = Math.random() * canvasWidth;
  //   const y = Math.random() * canvasHeight;
  //   const xa = Math.random() * 2 - 1;
  //   const ya = Math.random() * 2 - 1;
  //   return { x, y, xa, ya, max: 6000 };
  // });

  // // マウスも含めた全ての点
  // const allPoints: (Point | Mouse)[] = [...points, mouse];

  // // 描画開始
  // setTimeout(draw, 100);

  console.log("test from animation.page.ts");

  // === ① 旧ロゴを即時に隠す（FOUC対策） ===
  const HIDER_ID = "hide-old-logo-style";
  (() => {
    const style = document.createElement("style");
    style.id = HIDER_ID;
    style.textContent = `
    img.nav__logo[src="/components/navigation/nav-logo-small_dark.png"]{
      visibility: hidden !important; /* display:noneだとレイアウトが飛ぶのでvisibility */
    }
  `;
    document.documentElement.appendChild(style);
  })();

  const SELECTOR = 'img.nav__logo[src="/components/navigation/nav-logo-small_dark.png"]';

  function getHeightBasis(img: HTMLImageElement): number {
    const anchor = img.closest<HTMLElement>("a");
    const li = img.closest<HTMLElement>("li");
    const navList = img.closest<HTMLElement>(
      'ol.nav_list, ol[class*="nav_list"], ul.nav_list, ul[class*="nav_list"]'
    );

    const h = (el?: Element | null) => (el ? (el as HTMLElement).getBoundingClientRect().height : 0);
    return Math.round(h(navList) || h(li) || h(anchor) || h(img) || 32);
  }

  function replaceLogo(img: HTMLImageElement) {
    const containerH = getHeightBasis(img);
    const fontSize = Math.max(12, Math.floor(containerH * 0.5));

    const logoText = document.createElement("span");
    logoText.style.cssText = [
      "display:inline-flex",
      "align-items:center",
      "justify-content:flex-start",
      `height:${containerH}px`,
      "line-height:1",
      `font-size:${fontSize}px`,
      "font-weight:800",
      "letter-spacing:0.2px",
      'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans"',
      "user-select:none",
    ].join(";");

    const s1 = document.createElement("span");
    s1.textContent = "hibiki";
    s1.style.color = "#e11d48";

    const s2 = document.createElement("span");
    s2.textContent = "code";
    s2.style.cssText = "color:#0f172a;margin-left:2px;";

    logoText.append(s1, s2);

    const anchor = img.closest<HTMLAnchorElement>("a");
    if (anchor && anchor.contains(img)) {
      anchor.style.cssText += ";display:flex;align-items:center;justify-content:flex-start;";
      img.replaceWith(logoText);
    } else {
      img.replaceWith(logoText);
    }

    // 置換に成功したらハイダーCSSを外す
    const hider = document.getElementById(HIDER_ID);
    if (hider) hider.remove();
  }

  // === ② できるだけ早く実行（DOMContentLoaded or すでに読み込み済みなら即実行） ===
  function tryOnce(): boolean {
    const img = document.querySelector<HTMLImageElement>(SELECTOR);
    if (img) {
      replaceLogo(img);
      return true;
    }
    return false;
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryOnce, { once: true });
  } else {
    tryOnce();
  }

  // === ③ SPA/遅延挿入にも対応（MutationObserverで監視して見つけ次第置換） ===
  const mo = new MutationObserver(() => {
    if (tryOnce()) mo.disconnect();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });




})();
