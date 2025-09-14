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
    // 対象の要素を取得
    const navList = document.querySelector<HTMLOListElement>(
      "ol.nav__list.nav__list--secondary.clearfix"
    );

    if (navList) {
      // 不可視にする
      navList.style.display = "none";
    }
  });

  window.addEventListener("load", () => {
    const logoSelector =
      // 'img.nav__logo[src="/components/navigation/nav-logo-small_darks.png"]';
      'img.nav__logo';
    const img = document.querySelector<HTMLImageElement>(logoSelector);


    if (!img) {
      console.log("ロゴ画像が見つかりませんでした（selector mismatch）。");
      return;
    }

    // できるだけ信頼できる親たちを拾う（順にフォールバック）
    const anchor = img.closest<HTMLAnchorElement>("a");
    const li = img.closest<HTMLElement>("li");
    const navList = img.closest<HTMLElement>(
      'ol.nav_list, ol[class*="nav_list"], ul.nav_list, ul[class*="nav_list"]'
    );

    // 高さの取得（最優先: navList → li → anchor → 画像自身）
    const getH = (el?: Element | null) =>
      el ? (el as HTMLElement).getBoundingClientRect().height : 0;
    const containerH =
      Math.round(
        getH(navList) || getH(li) || getH(anchor) || getH(img) || 32
      );

    // 文字サイズは高さに追従（視覚補正込み）
    const fontSize = Math.max(12, Math.floor(containerH * 0.5));

    // 文字ロゴ（span）を作成
    const logoText = document.createElement("span");
    logoText.style.cssText = [
      "display:inline-flex",
      "align-items:center",
      "justify-content:flex-start",
      // anchorの高さにフィットさせる
      `height:${containerH}px`,
      "line-height:1",
      `font-size:${fontSize}px`,
      "font-weight:800",
      "letter-spacing:0.2px",
      'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans"',
      "-webkit-font-smoothing:antialiased",
      "text-rendering:optimizeLegibility",
      "user-select:none",
    ].join(";");

    const spanHibiki = document.createElement("span");
    spanHibiki.textContent = "hibiki";
    spanHibiki.style.color = "#00bfff"; // ← 好みで変更OK

    const spanCode = document.createElement("span");
    spanCode.textContent = "code";
    spanCode.style.cssText = "color:#87cefa; margin-left:2px;";

    logoText.append(spanHibiki, spanCode);

    // 置換先は基本 <a> の中の <img>
    if (anchor && anchor.contains(img)) {
      // anchor自体を中央寄せできるようにする（上書きではなく追記）
      anchor.style.cssText += [
        ";display:flex",
        "align-items:center",      // ★ 親高さの中央に
        "justify-content:flex-start",
        `height:${containerH}px`,  // ★ 親と同じ高さに合わせる
        "text-decoration:none",
        "color:inherit",
        "gap:0",
        "padding:0 6px",           // 余白はお好みで
      ].join(";");

      img.replaceWith(logoText);
      console.log("ロゴ: <a> 内の <img> を文字ロゴに置換（中央揃え）しました。");
      return;
    }

    // 次善策：LIの中で置き換え
    if (li && li.contains(img)) {
      li.style.cssText += [
        ";display:flex",
        "align-items:center",
        `height:${containerH}px`,
      ].join(";");
      img.replaceWith(logoText);
      console.log("ロゴ: <li> 内で置換（中央揃え）しました。");
      return;
    }

    // 最終フォールバック：navList または元の位置
    if (navList) {
      navList.style.cssText += [
        ";display:flex",
        "align-items:center",
      ].join(";");
      img.replaceWith(logoText);
      console.log("ロゴ: navList 基準で置換（中央揃え）しました。");
      return;
    }

    // どうしても親を特定できない場合
    img.replaceWith(logoText);
    console.warn("親要素が特定できなかったため、その場で置換しました。");
  });

  window.addEventListener("load", () => {
    // 対象の要素を取得
    const navList = document.querySelector<HTMLOListElement>(
      "ol.nav__list.nav__list--secondary.clearfix"
    );

    if (navList) {
      // 可視にする
      navList.style.display = "";
    }
  });

})();
