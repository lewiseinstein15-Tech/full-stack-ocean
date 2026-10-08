// Download all T1 material files into frontend/public/materials/ and write
// backend/scripts/materialsFiles.json mapping original URL -> in-app path.
// Run on VM:  cd backend && node scripts/downloadMaterials.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const M = require('./materialsData.js');
const items = M.materials || M;

const FRONT = path.join(__dirname, '..', '..', 'frontend', 'public', 'materials');
const MAP_OUT = path.join(__dirname, 'materialsFiles.json');
const map = {};

const FIELDS = ['transcriptUrl', 'slidesUrl', 'practicePdfUrl', 'practiceZipUrl', 'practiceSolUrl', 'readingUrl'];

function download(url, dest, depth = 0) {
  return new Promise((resolve) => {
    if (depth > 4) return resolve(false);
    const mod = url.startsWith('http:') ? http : https;
    const file = fs.createWriteStream(dest);
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlink(dest, () => {});
        let loc = res.headers.location;
        if (loc.startsWith('/')) {
          const u = new URL(url);
          loc = `${u.protocol}//${u.host}${loc}`;
        }
        return resolve(download(loc, dest, depth + 1));
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(true)));
    });
    req.on('error', () => {
      file.close();
      fs.unlink(dest, () => {});
      resolve(false);
    });
    req.setTimeout(30000, () => req.destroy());
  });
}

(async () => {
  fs.mkdirSync(FRONT, { recursive: true });
  let ok = 0;
  const fail = [];
  for (const item of items) {
    const slug = item.slug;
    if (!slug) continue;
    const course = (item.course || 'x').replace(/\./g, '');
    const mats = item.materials || {};
    for (const f of FIELDS) {
      const url = mats[f];
      if (!url || !/^https?:/i.test(url)) continue;
      if (map[url]) continue;
      const type = f.replace('Url', '');
      let ext = url.split('.').pop().split('?')[0].toLowerCase();
      if (!/^[a-z0-9]{2,4}$/.test(ext)) ext = 'pdf';
      const fname = `${slug}-${type}.${ext}`;
      const dest = path.join(FRONT, course, fname);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const good = await download(url, dest);
      if (good && fs.existsSync(dest) && fs.statSync(dest).size > 500) {
        map[url] = `/materials/${course}/${fname}`;
        ok++;
        console.log('ok', map[url]);
      } else {
        fail.push(url);
        console.log('FAIL', url);
      }
      await new Promise((r) => setTimeout(r, 120));
    }
  }
  fs.writeFileSync(MAP_OUT, JSON.stringify(map, null, 1));
  console.log('downloaded:', ok, '| failed:', fail.length);
})();
