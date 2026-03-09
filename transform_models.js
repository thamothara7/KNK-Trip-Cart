const fs = require('fs');
const path = require('path');
const outDir = 'src/lib/models';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync('../backend/models').filter(f => f.endsWith('.js'));
for (const file of files) {
  let content = fs.readFileSync(path.join('../backend/models', file), 'utf8');
  content = content.replace("const mongoose = require('mongoose');", 'import mongoose from "mongoose";');
  content = content.replace(/module\.exports\s*=\s*mongoose\.model\(['"]([^'"]+)['"],\s*([^)]+)\);/, 'export default mongoose.models.$1 || mongoose.model("$1", $2);');
  content = content.replace(/const\s+([A-Za-z0-9_]+)\s*=\s*mongoose\.model\(['"]([^'"]+)['"],\s*([^)]+)\);[\s\S]*module\.exports\s*=\s*\1;/, 'const $1 = mongoose.models.$2 || mongoose.model("$2", $3);\nexport default $1;');
  fs.writeFileSync(path.join(outDir, file), content);
}
console.log('Converted models');
