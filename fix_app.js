import fs from 'fs';

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Insert AiAnalyzerSection back
if (!appCode.includes('<AiAnalyzerSection />')) {
  appCode = appCode.replace(
    /\{\/\* ESP AI ANALYZER Deep Dive & High-Res Gallery \*\/\}/,
    `{/* ESP AI ANALYZER Deep Dive */}\n        <AiAnalyzerSection />`
  );
}

fs.writeFileSync('src/App.tsx', appCode);

// Now reorder productsList in engineeringData.ts
let dataCode = fs.readFileSync('src/data/engineeringData.ts', 'utf8');

// The easiest way to swap them safely without writing a full AST parser:
// Split the array manually if we can, but they are objects.
// Let's just find the start of modal-calc and modal-esp.
// Wait, I can just replace the whole productsList array since it's just two elements.
