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

  window.addEventListener("load", () => {
    const logoSelector =
      'img.nav__logo[src="/components/navigation/nav-logo-small_dark.png"]';
    const img = document.querySelector<HTMLImageElement>(logoSelector);

    if (!img) {
      console.log("指定されたロゴ要素は存在しませんでした。");
      return;
    }

    // 親要素を取得
    const li = img.closest("li.nav__list-item");
    const ol = img.closest("ol.nav_list"); // ← 青くなった ol 要素

    if (!li || !ol) {
      console.log("親要素が見つかりませんでした。");
      return;
    }

    // ol の高さを取得
    const olRect = ol.getBoundingClientRect();
    const containerH = Math.round(olRect.height);
    const fontSize = Math.max(12, Math.floor(containerH * 0.5));

    // 新しいロゴを作成
    const logoWrapper = document.createElement("a");
    logoWrapper.href = "/";
    logoWrapper.setAttribute("aria-label", "hibikicode - home");

    logoWrapper.setAttribute(
      "style",
      [
        "display:flex",              // Flexbox
        "align-items:center",        // ★ 親の高さの中央に配置
        "justify-content:flex-start",
        `height:${containerH}px`,    // ol と同じ高さに合わせる
        "text-decoration:none",
        "user-select:none",
        "background:transparent",
        "cursor:pointer",
        "padding:0 6px",
        "border-radius:6px",
        `font-size:${fontSize}px`,
        "font-family:ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\"",
        "font-weight:800",
        "letter-spacing:0.2px",
        "-webkit-font-smoothing:antialiased",
        "text-rendering:optimizeLegibility",
      ].join(";")
    );

    const spanHibiki = document.createElement("span");
    spanHibiki.textContent = "hibiki";
    spanHibiki.style.color = "#e11d48"; // hibiki 赤系

    const spanCode = document.createElement("span");
    spanCode.textContent = "code";
    spanCode.style.cssText = "color:#0f172a; margin-left:2px;";

    logoWrapper.appendChild(spanHibiki);
    logoWrapper.appendChild(spanCode);

    // 画像と置き換え
    img.replaceWith(logoWrapper);

    console.log("ロゴを ol 高さの中央に合わせて置き換えました。");
  });


})();
