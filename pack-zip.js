const path = require("path");
const fs = require("fs");
const JSZip = require("jszip");

const root = __dirname;
const zip = new JSZip();
const manifestPath = path.join(root, "plugin.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

zip.file("plugin.json", fs.readFileSync(manifestPath));
zip.file("LICENSE", fs.readFileSync(path.join(root, "LICENSE")));

for (const metadataPath of [manifest.readme, manifest.changelogs]) {
  if (metadataPath) {
    const fullPath = path.join(root, metadataPath);
    if (fs.existsSync(fullPath)) {
      zip.file(metadataPath, fs.readFileSync(fullPath));
    }
  }
}

const iconPath = path.join(root, "icon.png");
if (fs.existsSync(iconPath)) {
  zip.file("icon.png", fs.readFileSync(iconPath));
}

function addDirectory(sourceDir, zipDir = "") {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const zipPath = path.posix.join(zipDir, entry.name);

    if (entry.isDirectory()) {
      addDirectory(sourcePath, zipPath);
    } else {
      zip.file(zipPath, fs.readFileSync(sourcePath));
    }
  }
}

const distPath = path.join(root, "dist");
if (!fs.existsSync(distPath)) {
  throw new Error("Missing dist/ directory. Run the build before packaging.");
}
addDirectory(distPath);

zip.generateAsync({ type: "nodebuffer" }).then((buffer) => {
  fs.writeFileSync(path.join(root, "plugin.zip"), buffer);
  console.log("Created plugin.zip");
}).catch((error) => {
  console.error("Could not create plugin.zip:", error);
  process.exitCode = 1;
});
