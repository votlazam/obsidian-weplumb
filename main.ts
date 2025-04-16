import { App, Plugin, TFolder } from "obsidian";
import { SiteGenerator } from "./site-generator";
import { SitePublisher } from "./site-publisher";
import { WeplumbSettingTab, DEFAULT_SETTINGS } from "./settings";

export default class WeplumbPlugin extends Plugin {
  settings: typeof DEFAULT_SETTINGS = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new WeplumbSettingTab(this.app, this));
    this.createMarkdownFolder();

    this.addCommand({
      id: "generate-site",
      name: "Generate Website",
      callback: () => this.generateWebsite(),
    });

    this.addCommand({
      id: "publish-site",
      name: "Publish Website",
      callback: () => this.publishWebsite(),
    });
  }

  createMarkdownFolder() {
    const folderName = "weplumb-site";
    if (!this.app.vault.getAbstractFileByPath(folderName)) {
      this.app.vault.createFolder(folderName);
    }
  }

  async generateWebsite() {
    try {
      const generator = new SiteGenerator(this.app);
      await generator.generateSite("weplumb-site");
      console.log("Website generation complete.");
    } catch (error) {
      console.error("Error generating website:", error);
    }
  }

  async publishWebsite() {
    try {
      if (!this.settings.githubRepo) {
        throw new Error("GitHub repository URL not configured.");
      }
      const publisher = new SitePublisher(this.app, this.settings.githubRepo);
      await publisher.publishSite();
      console.log("Website published successfully.");
    } catch (error) {
      console.error("Error publishing website:", error);
    }
  }

  // Inizializza le impostazioni predefinite
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}