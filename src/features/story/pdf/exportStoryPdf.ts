import { jsPDF } from "jspdf";
import { BRAND_NAME } from "../../../shared/constants/brand";
import { RTL_LANGUAGES } from "../model/options";
import type { Story } from "../model/types";
import { BRAND_FONT, GOLD, INK, MARGIN, PAGE_HEIGHT, PAGE_WIDTH, SERIF, createPage, wrapText, type PdfPage } from "./pdfPage";

const BODY_FONT = `400 34px ${SERIF}`;
const BODY_ITALIC_FONT = `italic 400 34px ${SERIF}`;
const BODY_LINE_HEIGHT = 52;
const SECTION_FONT = `600 46px ${SERIF}`;
const SECTION_LINE_HEIGHT = 64;

/** A file name made from the title, without characters file systems reject. */
const toFileName = (title: string) =>
  title
    .replace(/[\\/:*?"<>|]+/g, "")
    .trim()
    .slice(0, 60) || "fairy-tale";

/** Lays the story out over parchment pages and downloads it as a PDF. */
export async function exportStoryPdf(story: Story) {
  await Promise.all([document.fonts.load(`48px ${BRAND_FONT}`), document.fonts.ready]);
  const isRtl = RTL_LANGUAGES.has(story.filters.language);
  const pages: PdfPage[] = [];
  const textX = isRtl ? PAGE_WIDTH - MARGIN : MARGIN;
  const maxWidth = PAGE_WIDTH - MARGIN * 2;

  let page = createPage(isRtl);
  pages.push(page);
  let y = MARGIN + 40;

  const startPage = (top: number) => {
    page = createPage(isRtl);
    pages.push(page);
    y = top;
  };

  const writeBlock = (text: string, font: string, lineHeight: number, align: CanvasTextAlign = "start") => {
    page.ctx.font = font;
    page.ctx.textAlign = align;
    const x = align === "center" ? PAGE_WIDTH / 2 : textX;
    for (const line of wrapText(page.ctx, text, maxWidth)) {
      if (y + lineHeight > PAGE_HEIGHT - MARGIN) {
        startPage(MARGIN + 20);
        page.ctx.font = font;
        page.ctx.textAlign = align;
      }
      page.ctx.fillText(line, x, y + lineHeight * 0.8);
      y += lineHeight;
    }
  };

  page.ctx.fillStyle = GOLD;
  writeBlock(BRAND_NAME, `44px ${BRAND_FONT}`, 60, "center");
  page.ctx.fillStyle = INK;
  y += 20;
  writeBlock(story.title, `600 64px ${SERIF}`, 80, "center");
  y += 30;

  for (const paragraph of story.paragraphs) {
    writeBlock(paragraph.text, BODY_FONT, BODY_LINE_HEIGHT);
    y += 50;
  }

  startPage(MARGIN + 40);
  writeBlock("✦  Summary  ✦", SECTION_FONT, SECTION_LINE_HEIGHT, "center");
  y += 20;
  writeBlock(story.summary, BODY_ITALIC_FONT, BODY_LINE_HEIGHT);
  if (story.moral) {
    y += 50;
    writeBlock("✦  Moral  ✦", SECTION_FONT, SECTION_LINE_HEIGHT, "center");
    y += 20;
    writeBlock(story.moral, BODY_ITALIC_FONT, BODY_LINE_HEIGHT);
  }

  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  pages.forEach((pdfPage, index) => {
    if (index > 0) pdf.addPage();
    pdf.addImage(pdfPage.canvas.toDataURL("image/jpeg", 0.88), "JPEG", 0, 0, 210, 297);
  });
  pdf.save(`${toFileName(story.title)}.pdf`);
}
