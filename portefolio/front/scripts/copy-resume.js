const fs = require('fs');
const path = require('path');

const resumeDirCandidates = [
  path.resolve(__dirname, '../../../resume'),
  path.resolve(__dirname, '../../resume'),
  path.resolve(process.cwd(), '../resume'),
  path.resolve(process.cwd(), 'resume'),
];

for (const dir of resumeDirCandidates) {
  if (fs.existsSync(dir)) {
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Copy French CV
    const frSource = path.join(dir, 'resume_fr.pdf');
    if (fs.existsSync(frSource)) {
      fs.copyFileSync(frSource, path.join(publicDir, 'resume_fr.pdf'));
      fs.copyFileSync(frSource, path.join(publicDir, 'cv_fr.pdf'));
      console.log('Copied resume_fr.pdf to public folder');
    }

    // Copy English CV
    const enSource = path.join(dir, 'resume.pdf');
    if (fs.existsSync(enSource)) {
      fs.copyFileSync(enSource, path.join(publicDir, 'resume_en.pdf'));
      fs.copyFileSync(enSource, path.join(publicDir, 'cv_en.pdf'));
      fs.copyFileSync(enSource, path.join(publicDir, 'resume.pdf'));
      fs.copyFileSync(enSource, path.join(publicDir, 'cv.pdf'));
      console.log('Copied resume_en.pdf to public folder');
    }
    break;
  }
}
