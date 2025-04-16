"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeplumbSettingTab = exports.DEFAULT_SETTINGS = void 0;
const obsidian_1 = require("obsidian");
exports.DEFAULT_SETTINGS = {
    githubRepo: "",
};
class WeplumbSettingTab extends obsidian_1.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.containerEl = document.createElement("div"); // Initialize containerEl
    }
    display() {
        // Pulisce il contenuto precedente
        this.containerEl.empty();
        this.containerEl.createEl("h2", { text: "Weplumb Settings" });
        new obsidian_1.Setting(this.containerEl)
            .setName("GitHub Repository")
            .setDesc("Format: https://github.com/username/repository.git")
            .addText((text) => {
            text
                .setPlaceholder("https://github.com/your-username/your-repo.git") // Placeholder per l'input
                .setValue(this.plugin.settings.githubRepo) // Valore attuale delle impostazioni
                .onChange(async (value) => {
                // Aggiorna le impostazioni quando il valore cambia
                this.plugin.settings.githubRepo = value;
                await this.plugin.saveSettings();
            });
        });
    }
}
exports.WeplumbSettingTab = WeplumbSettingTab;
