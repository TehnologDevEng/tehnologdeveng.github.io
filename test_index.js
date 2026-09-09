import fs from 'fs';
let dataCode = fs.readFileSync('src/data/engineeringData.ts', 'utf8');
console.log(dataCode.indexOf(`id: 'modal-esp',`));
console.log(dataCode.indexOf(`id: 'modal-calc',`));
console.log(dataCode.indexOf(`export const modalsData`));
