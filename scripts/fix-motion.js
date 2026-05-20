const fs = require("fs");
const path = require("path");

function fix(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) fix(p);
    else if (/\.tsx$/.test(f)) {
      const c = fs.readFileSync(p, "utf8");
      const n = c.replace(/<motion\b/g, "<div").replace(/<\/motion>/g, "</div>");
      if (c !== n) {
        fs.writeFileSync(p, n);
        console.log("fixed", p);
      }
    }
  }
}

fix(path.join(__dirname, "../src"));
