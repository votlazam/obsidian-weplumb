"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitePublisher = void 0;
const simple_git_1 = __importDefault(require("simple-git"));
class SitePublisher {
    constructor(app, githubRepo) {
        this.app = app;
        this.githubRepo = githubRepo;
    }
    async publishSite() {
        const outputFolder = "weplumb-output";
        const git = (0, simple_git_1.default)({
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
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Git error: ${error.message}`);
            }
        }
    }
}
exports.SitePublisher = SitePublisher;
