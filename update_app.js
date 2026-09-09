import fs from 'fs';

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove LightboxModal imports
appCode = appCode.replace(/import \{ LightboxModal \} from '\.\/components\/LightboxModal\.tsx';\n/, '');

// 2. Remove screenshotGallery import
appCode = appCode.replace(/screenshotGallery,\s*/g, '');

// 3. Remove lightbox states & handlers
appCode = appCode.replace(/\/\/ Lightbox state\n[^\n]+\n/g, '');
appCode = appCode.replace(/const handleOpenLightbox[\s\S]*?(?=const handleLightboxNavigate|return \()/g, '');
appCode = appCode.replace(/const handleLightboxNavigate[\s\S]*?(?=const currentScreenshot|return \()/g, '');
appCode = appCode.replace(/const currentScreenshot[\s\S]*?(?=return \()/g, '');

// 4. Remove LightboxModal component
appCode = appCode.replace(/<LightboxModal[\s\S]*?\/>/g, '');

fs.writeFileSync('src/App.tsx', appCode);
