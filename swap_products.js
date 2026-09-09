import fs from 'fs';

let dataCode = fs.readFileSync('src/data/engineeringData.ts', 'utf8');

const espIndex = dataCode.indexOf(`  {\n    id: 'modal-esp',`);
const calcIndex = dataCode.indexOf(`  {\n    id: 'modal-calc',`);
const endOfArray = dataCode.indexOf(`];\n\nexport const modalsData`);

if (espIndex !== -1 && calcIndex !== -1 && espIndex < calcIndex) {
  const espBlock = dataCode.substring(espIndex, calcIndex);
  const calcBlock = dataCode.substring(calcIndex, endOfArray);
  
  const before = dataCode.substring(0, espIndex);
  const after = dataCode.substring(endOfArray);
  
  let newCalcBlock = calcBlock.trim();
  if (!newCalcBlock.endsWith(',')) newCalcBlock += ',';
  let newEspBlock = espBlock.trim();
  if (newEspBlock.endsWith(',')) newEspBlock = newEspBlock.slice(0, -1);
  
  const newCode = before + `  ${newCalcBlock}\n  ${newEspBlock}\n` + after;
  fs.writeFileSync('src/data/engineeringData.ts', newCode);
  console.log("Swapped products");
} else {
  console.log("Could not find blocks correctly");
}

