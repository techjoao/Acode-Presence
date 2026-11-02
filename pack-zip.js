const path = require("node:path");
const fs = require("node:fs");
const JSZip = require("jszip");

async function main() {
  const root = __dirname;
  const zip = new JSZip();
  const manifestPath = path.join(root, "plugin.json");
  const manifest = JSON.parse(await fs.promises.readFile(manifestPath, "utf8"));

  // Acode expects the entry file at the same path declared by plugin.json.
  const entryPath = path.join(root, "dist", "main.js");
  if (!fs.existsSync(entryPath)) {
    throw new Error("Missing dist/main.js. Run npm run build before packaging.");
  }

  zip.file("plugin.json", await fs.promises.readFile(manifestPath));
  zip.file(manifest.main || "main.js", await fs.promises.readFile(entryPath));
  zip.file("LICENSE", await fs.promises.readFile(path.join(root, "LICENSE")));

  for (const metadataPath of [manifest.readme, manifest.changelogs]) {
    if (metadataPath) {
      const fullPath = path.join(root, metadataPath);
      if (fs.existsSync(fullPath)) {
        zip.file(metadataPath, await fs.promises.readFile(fullPath));
      }
    }
  }

  const iconPath = path.join(root, "icon.png");
  if (fs.existsSync(iconPath)) {
    zip.file("icon.png", await fs.promises.readFile(iconPath));
  }

  const buffer = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  const outputPath = path.join(root, "plugin.zip");
  await fs.promises.writeFile(outputPath, buffer);
  console.log(`Created ${path.basename(outputPath)} (${buffer.length} bytes)`);
}

main().catch((error) => {
  console.error("Could not create plugin.zip:", error);
  process.exitCode = 1;
});
