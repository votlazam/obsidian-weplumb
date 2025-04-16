"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
const site_generator_1 = require("./site-generator");
const site_publisher_1 = require("./site-publisher");
const settings_1 = require("./settings");
class WeplumbPlugin extends obsidian_1.Plugin {
    constructor() {
        super(...arguments);
        this.settings = settings_1.DEFAULT_SETTINGS;
    }
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new settings_1.WeplumbSettingTab(this.app, this));
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
            const generator = new site_generator_1.SiteGenerator(this.app);
            await generator.generateSite("weplumb-site");
            console.log("Website generation complete.");
        }
        catch (error) {
            console.error("Error generating website:", error);
        }
    }
    async publishWebsite() {
        try {
            if (!this.settings.githubRepo) {
                throw new Error("GitHub repository URL not configured.");
            }
            const publisher = new site_publisher_1.SitePublisher(this.app, this.settings.githubRepo);
            await publisher.publishSite();
            console.log("Website published successfully.");
        }
        catch (error) {
            console.error("Error publishing website:", error);
        }
    }
    // Inizializza le impostazioni predefinite
    async loadSettings() {
        this.settings = Object.assign({}, settings_1.DEFAULT_SETTINGS, await this.loadData());
    }
    async saveSettings() {
        await this.saveData(this.settings);
    }
}
exports.default = WeplumbPlugin;
