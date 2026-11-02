import plugin from "../plugin.json";
import { DEFAULT_SETTINGS } from "./config/defaults.js";
import { renderPanel } from "./ui/panel.js";

const COMMAND_ID = "acode-presence.open";

class AcodePresencePlugin {
  constructor() {
    this.page = null;
    this.commands = null;
    this.settings = { ...DEFAULT_SETTINGS };
  }

  async init($page) {
    this.page = $page;
    this.commands = acode.require("commands");

    this.commands.addCommand({
      name: COMMAND_ID,
      description: "Open Acode Presence",
      exec: () => {
        this.openPanel();
        return true;
      },
    });

    console.log("[Acode Presence] Plugin initialized");
  }

  openPanel() {
    if (!this.page) return;

    renderPanel(this.page, this.settings, (nextSettings) => {
      this.settings = { ...nextSettings };
    });

    this.page.show();
  }

  destroy() {
    if (this.commands) {
      this.commands.removeCommand(COMMAND_ID);
    }

    this.page = null;
    this.commands = null;
    console.log("[Acode Presence] Plugin unloaded");
  }
}

if (window.acode) {
  const pluginInstance = new AcodePresencePlugin();

  acode.setPluginInit(plugin.id, async (_baseUrl, $page) => {
    await pluginInstance.init($page);
  });

  acode.setPluginUnmount(plugin.id, () => {
    pluginInstance.destroy();
  });
}
