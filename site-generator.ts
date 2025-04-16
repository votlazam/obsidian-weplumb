import { App, TFile, TFolder } from "obsidian";
import marked from "marked"; // Importazione corretta

export class SiteGenerator {
  constructor(private app: App) {}

  /**
   * Genera i file HTML a partire dai file Markdown nella cartella specificata.
   * @param folderName Nome della cartella contenente i file Markdown.
   */
  async generateSite(folderName: string) {
    const folder = this.app.vault.getAbstractFileByPath(folderName);
    if (!folder || !(folder instanceof TFolder)) {
      throw new Error("Invalid folder.");
    }

    const outputFolder = "weplumb-output";
    await this.createOutputFolder(outputFolder);

    try {
      for (const file of folder.children) {
        if (file instanceof TFile && file.extension === "md") {
          const content = await this.app.vault.read(file);
          const htmlContent = this.generateHTML(file.basename, content);
          const outputPath = `${outputFolder}/${file.basename}.html`;
          await this.app.vault.adapter.write(outputPath, htmlContent);
        }
      }
    } catch (error) {
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
  private generateHTML(title: string, content: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
        </head>
        <body>
          ${marked(content)}
        </body>
      </html>
    `;
  }

  /**
   * Crea la cartella di output se non esiste.
   * @param path Percorso della cartella di output.
   */
  private async createOutputFolder(path: string) {
    if (!this.app.vault.getAbstractFileByPath(path)) {
      await this.app.vault.createFolder(path);
    }
  }
}