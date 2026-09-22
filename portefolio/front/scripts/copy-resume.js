const fs = require('fs');
const path = require('path');

const candidates = [
  path.resolve(__dirname, '../../../resume/resume.pdf'),
  path.resolve(__dirname, '../../resume/resume.pdf'),
  path.resolve(process.cwd(), '../resume/resume.pdf'),
  path.resolve(process.cwd(), '../../resume/resume.pdf'),
];

for (const candidate of candidates) {
  if (fs.existsSync(candidate)) {
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.copyFileSync(candidate, path.join(publicDir, 'resume.pdf'));
    fs.copyFileSync(candidate, path.join(publicDir, 'cv.pdf'));
    console.log(`Copied ${candidate} to public/resume.pdf and cv.pdf`);
    break;
  }
}
