import { App } from "obsidian";
import simpleGit, { SimpleGit } from "simple-git";

export class SitePublisher {
  constructor(private app: App, private githubRepo: string) {}

  async publishSite() {
    const outputFolder = "weplumb-output";
    const git = simpleGit({
      baseDir: outputFolder,
      binary: "git",
      maxConcurrentProcesses: 6,
    });

    try {
      await git.init();
      await git.addRemote("origin", this.githubRepo);
      await git.add(".");
      await git.commit("Automated update from Weplumb");
      await git.push("origin", "main", ["--force"]); // Forza il push per evitare conflitti
      console.log("Website published successfully.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Git error: ${error.message}`);
      }
    }
  }
}