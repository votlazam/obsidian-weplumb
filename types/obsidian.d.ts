declare module "obsidian" {
  export class App {
    vault: Vault;
  }

  export class Vault {
    adapter: Adapter;
    getAbstractFileByPath(path: string): TAbstractFile | null;
    createFolder(path: string): Promise<void>;
    read(file: TFile): Promise<string>;
  }

  export class Adapter {
    basePath: string;
    write(path: string, data: string): Promise<void>;
  }

  export class TAbstractFile {}

  export class TFolder extends TAbstractFile {
    children: TAbstractFile[];
  }

  export class TFile extends TAbstractFile {
    basename: string;
    extension: string;
  }

  export class Plugin {
    app: App;
    addCommand(command: Command): void;
    addSettingTab(tab: PluginSettingTab): void;
    loadData(): Promise<any>;
    saveData(data: any): Promise<void>;
  }

  export interface Command {
    id: string;
    name: string;
    callback: () => void;
  }

  export class PluginSettingTab {
    constructor(app: App, plugin: Plugin);
    display(): void;
  }

  export class Setting {
    constructor(containerEl: HTMLElement);
    setName(name: string): this;
    setDesc(desc: string): this;
    addText(callback: (text: TextComponent) => void): this;
  }

  export class TextComponent {
    setPlaceholder(placeholder: string): this;
    setValue(value: string): this;
    onChange(callback: (value: string) => any): this;
  }
}