import fs from 'fs';
let dataCode = fs.readFileSync('src/data/engineeringData.ts', 'utf8');

const start = dataCode.indexOf('export const screenshotGallery');
const end = dataCode.indexOf('export const telemetryPresets');

if (start !== -1 && end !== -1) {
  dataCode = dataCode.substring(0, start) + dataCode.substring(end);
  fs.writeFileSync('src/data/engineeringData.ts', dataCode);
  console.log("Removed screenshotGallery");
}
