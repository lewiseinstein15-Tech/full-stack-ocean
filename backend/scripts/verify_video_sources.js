// Verify every video source in ossuVideos.js actually exists.
//  - playlistId  -> YouTube oEmbed must return HTTP 200 + title/author
//  - other urls  -> must respond 2xx/3xx
// Exits non-zero on any failure. Run: node scripts/verify_video_sources.js
const https = require('https');
const { URL } = require('url');

const { courseVideos } = require('../seeds/ossuVideos');

function fetchUrl(url, redirectsLeft = 4) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (verify-video-sources)' }, timeout: 20000 }, (res) => {
      let body = '';
      res.on('data', (c) => { if (body.length < 65536) body += c; });
      res.on('end', () => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && redirectsLeft > 0 && res.headers.location) {
          const next = new URL(res.headers.location, url).toString();
          resolve(fetchUrl(next, redirectsLeft - 1));
        } else {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, body: '', error: 'timeout' }); });
    req.on('error', (e) => resolve({ status: 0, body: '', error: e.message }));
  });
}

const ytId = (u) => (u.match(/[?&]list=([^&]+)/) || [])[1];

async function main() {
  const playlistIds = new Map(); // id -> [courseCode]
  const otherUrls = new Map();   // url -> [courseCode]
  let entries = 0;

  for (const [code, list] of Object.entries(courseVideos)) {
    for (const v of list) {
      entries += 1;
      // Embedding-disabled playlists 401 on oEmbed even though they exist;
      // they ship as link cards, so check their URL instead.
      const id = v.embeddable === false ? null : (v.playlistId || ytId(v.url || ''));
      if (id) {
        if (!playlistIds.has(id)) playlistIds.set(id, []);
        playlistIds.get(id).push(code);
      } else if (v.url) {
        if (!otherUrls.has(v.url)) otherUrls.set(v.url, []);
        otherUrls.get(v.url).push(code);
      } else {
        console.log(`FAIL ${code}: entry "${v.title}" has neither playlistId nor url`);
        process.exitCode = 1;
      }
    }
  }

  console.log(`Checking ${entries} entries -> ${playlistIds.size} unique playlists, ${otherUrls.size} link URLs\n`);

  const jobs = [];
  for (const [id, codes] of playlistIds) {
    jobs.push((async () => {
      const oe = `https://www.youtube.com/oembed?url=${encodeURIComponent('https://www.youtube.com/playlist?list=' + id)}&format=json`;
      const r = await fetchUrl(oe);
      if (r.status !== 200) {
        console.log(`FAIL playlist ${id} (${codes.join(',')}): oEmbed HTTP ${r.status}`);
        process.exitCode = 1;
        return;
      }
      let meta = {};
      try { meta = JSON.parse(r.body); } catch { /* handled below */ }
      if (!meta.title || !meta.author_name) {
        console.log(`FAIL playlist ${id} (${codes.join(',')}): oEmbed 200 but no title/author`);
        process.exitCode = 1;
        return;
      }
      console.log(`ok   ${id} [${codes.join(',')}] "${meta.title}" by ${meta.author_name}`);
    })());
  }
  for (const [url, codes] of otherUrls) {
    jobs.push((async () => {
      const r = await fetchUrl(url);
      const ok = r.status >= 200 && r.status < 400;
      if (!ok) {
        console.log(`FAIL url ${url} (${codes.join(',')}): HTTP ${r.status}${r.error ? ' ' + r.error : ''}`);
        process.exitCode = 1;
        return;
      }
      console.log(`ok   ${url} [${codes.join(',')}] HTTP ${r.status}`);
    })());
  }

  await Promise.all(jobs);
  const bad = process.exitCode === 1;
  console.log(bad ? '\nRESULT: FAILURES FOUND' : `\nRESULT: all ${entries} entries verified`);
  process.exit(process.exitCode || 0);
}

main();
