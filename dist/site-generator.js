"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteGenerator = void 0;
const obsidian_1 = require("obsidian");
const marked_1 = __importDefault(require("marked")); // Importazione corretta
class SiteGenerator {
    constructor(app) {
        this.app = app;
    }
    /**
     * Genera i file HTML a partire dai file Markdown nella cartella specificata.
     * @param folderName Nome della cartella contenente i file Markdown.
     */
    async generateSite(folderName) {
        const folder = this.app.vault.getAbstractFileByPath(folderName);
        if (!folder || !(folder instanceof obsidian_1.TFolder)) {
            throw new Error("Invalid folder.");
        }
        const outputFolder = "weplumb-output";
        await this.createOutputFolder(outputFolder);
        try {
            for (const file of folder.children) {
                if (file instanceof obsidian_1.TFile && file.extension === "md") {
                    const content = await this.app.vault.read(file);
                    const htmlContent = this.generateHTML(file.basename, content);
                    const outputPath = `${outputFolder}/${file.basename}.html`;
                    await this.app.vault.adapter.write(outputPath, htmlContent);
                }
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error generating site: ${error.message}`);
            }
        }
    }
    /**
     * Converte il contenuto Markdown in HTML.
     * @param title Titolo del documento HTML.
     * @param content Contenuto Markdown da convertire.
     * @returns Stringa HTML generata.
     */
    generateHTML(title, content) {
        return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
        </head>
        <body>
          ${(0, marked_1.default)(content)}
        </body>
      </html>
    `;
    }
    /**
     * Crea la cartella di output se non esiste.
     * @param path Percorso della cartella di output.
     */
    async createOutputFolder(path) {
        if (!this.app.vault.getAbstractFileByPath(path)) {
            await this.app.vault.createFolder(path);
        }
    }
}
exports.SiteGenerator = SiteGenerator;
