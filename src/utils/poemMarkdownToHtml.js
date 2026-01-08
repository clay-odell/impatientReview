import { marked } from "marked";

export function poemMarkdownToHtml(text) {
  return marked(text || "");
}
