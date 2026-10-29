// A4 at ~150dpi. Pages are painted on a canvas so any script (Greek, Arabic, CJK…)
// renders with the browser's fonts — jsPDF's built-in fonts only cover Latin-1.
export const PAGE_WIDTH = 1240;
export const PAGE_HEIGHT = 1754;
export const MARGIN = 120;
export const INK = "#3b2a1a";
export const GOLD = "#b8893b";
export const SERIF = `"Fraunces", Georgia, "Noto Serif", serif`;
export const BRAND_FONT = `"Kawoszeh", ${SERIF}`;

export interface PdfPage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

/** A blank parchment page with a gilded double border, ready to write on. */
export function createPage(isRtl: boolean): PdfPage {
  const canvas = document.createElement("canvas");
  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;
  const ctx = canvas.getContext("2d")!;

  const background = ctx.createRadialGradient(PAGE_WIDTH / 2, PAGE_HEIGHT / 2, 200, PAGE_WIDTH / 2, PAGE_HEIGHT / 2, PAGE_HEIGHT);
  background.addColorStop(0, "#fbf4e2");
  background.addColorStop(1, "#efe0bd");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 50, PAGE_WIDTH - 100, PAGE_HEIGHT - 100);
  ctx.lineWidth = 1;
  ctx.strokeRect(62, 62, PAGE_WIDTH - 124, PAGE_HEIGHT - 124);

  ctx.direction = isRtl ? "rtl" : "ltr";
  ctx.fillStyle = INK;
  return { canvas, ctx };
}

/** Splits text into lines that fit maxWidth in the context's current font. */
export function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\n+/)) {
    let line = "";
    for (const word of paragraph.split(/(\s+)/)) {
      const candidate = line + word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line.trim()) lines.push(line.trim());
      line = word.trimStart();
      // Scripts without spaces (CJK) or very long words: break by character.
      while (ctx.measureText(line).width > maxWidth) {
        let fitLength = line.length;
        while (fitLength > 1 && ctx.measureText(line.slice(0, fitLength)).width > maxWidth) fitLength--;
        lines.push(line.slice(0, fitLength));
        line = line.slice(fitLength);
      }
    }
    if (line.trim()) lines.push(line.trim());
  }
  return lines;
}
