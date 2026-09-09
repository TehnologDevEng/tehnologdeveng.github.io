import fs from 'fs';
let dataCode = fs.readFileSync('src/data/engineeringData.ts', 'utf8');

const listStart = dataCode.indexOf('export const productsList: EngineeringProduct[] = [');
const listEnd = dataCode.indexOf('export const modalsData:');

let listStr = dataCode.substring(listStart, listEnd);

const items = listStr.split(/,\s*(?=\{)/);
// items[0] contains `export const productsList... [\n  { ...`
// items[1] contains `{ id: 'modal-calc' ...`

console.log("Found items:", items.length);
if (items.length >= 2) {
  // Let's just manually rebuild it since it's just two items.
  const arrContentMatch = listStr.match(/\[\s*([\s\S]*?)\s*\];/);
  if (arrContentMatch) {
    const arrContent = arrContentMatch[1];
    // Split by `  },`
    const parts = arrContent.split(/  \},\n  \{/);
    if (parts.length === 2) {
      const p0 = parts[0] + "  }";
      const p1 = "  {" + parts[1];
      const newArr = `[\n${p1},\n${p0}\n];`;
      dataCode = dataCode.replace(arrContentMatch[0], newArr);
      fs.writeFileSync('src/data/engineeringData.ts', dataCode);
      console.log("Swapped manually");
    }
  }
}
