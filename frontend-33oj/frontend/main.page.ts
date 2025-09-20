window.addEventListener("load", () => {
  const logoSelector =
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
