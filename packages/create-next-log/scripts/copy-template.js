const fs = require("fs-extra");
const path = require("path");

const src = path.join(__dirname, "..", "..", "template");
const dest = path.join(__dirname, "..", "template");

fs.removeSync(dest);
fs.copySync(src, dest, {
  filter: (srcPath) => {
    const basename = path.basename(srcPath);
    return !["node_modules", ".next", ".git", ".env", ".env.local", ".env.production"].includes(basename);
  },
});

console.log("Template copied to packages/create-next-log/template/");
