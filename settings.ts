import { App, Setting, PluginSettingTab } from "obsidian";
import WeplumbPlugin from "./main";

export interface WeplumbSettings {
  githubRepo: string;
}

export const DEFAULT_SETTINGS: WeplumbSettings = {
  githubRepo: "",
};

export class WeplumbSettingTab extends PluginSettingTab {
  private containerEl: HTMLElement;

  constructor(app: App, private plugin: WeplumbPlugin) {
    super(app, plugin);
    this.containerEl = document.createElement("div"); // Initialize containerEl
  }

  display(): void {
    // Pulisce il contenuto precedente
    this.containerEl.empty();
    this.containerEl.createEl("h2", { text: "Weplumb Settings" });

    new Setting(this.containerEl)
      .setName("GitHub Repository")
      .setDesc("Format: https://github.com/votlazam/obsidian-weplumb.git")
      .addText((text) => {
        text
          .setPlaceholder("https://github.com/votlazam/obsidian-weplumb.git") // Placeholder per l'input
          .setValue(this.plugin.settings.githubRepo) // Valore attuale delle impostazioni
          .onChange(async (value: string) => {
            // Aggiorna le impostazioni quando il valore cambia
            this.plugin.settings.githubRepo = value;
            await this.plugin.saveSettings();
          });
      });
  }
}