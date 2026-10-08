/* Dump all lessons (with links + metadata) from the live curriculum to /tmp/lessons.json */
const mongoose = require('mongoose');
const { Curriculum } = require('../models/Curriculum');

const uri = 'mongodb+srv://astrid_app:zSAKi6a9mTHiL6ORyQuNe7wP@astriddb.coo6jem.mongodb.net/fullstackocean?retryWrites=true&w=majority&appName=astriddb';

(async () => {
  await mongoose.connect(uri);
  const c = await Curriculum.findOne().lean();
  const out = [];
  for (const w of c.terms[0].weeks) {
    for (const d of w.days) {
      for (const l of (d.lessons || [])) {
        out.push({
          week: w.weekNumber,
          day: d.dayOfWeek,
          date: d.date,
          course: l.metadata && l.metadata.course,
          lectureNumber: l.metadata && l.metadata.lectureNumber,
          title: l.title,
          description: l.description,
          duration: l.duration,
          lectureUrl: l.lectureLink && l.lectureLink.url,
          practiceUrl: l.practiceLink && l.practiceLink.url,
          practiceTitle: l.practiceLink && l.practiceLink.title,
        });
      }
    }
  }
  require('fs').writeFileSync('/tmp/lessons.json', JSON.stringify(out, null, 1));
  console.log('WRITTEN ' + out.length + ' LESSONS');
  const roots = {};
  for (const o of out) {
    for (const k of ['lectureUrl', 'practiceUrl']) {
      if (o[k]) {
        const m = o[k].match(/ocw\.mit\.edu\/courses\/([^/]+)\//);
        if (m) roots[m[1]] = (roots[m[1]] || 0) + 1;
        else roots['OTHER:' + o[k].slice(0, 40)] = (roots['OTHER:' + o[k].slice(0, 40)] || 0) + 1;
      }
    }
  }
  console.log('UNIQUE SLUGS:', JSON.stringify(roots, null, 1));
  await mongoose.disconnect();
})().catch(e => { console.error('FATAL', e.message); process.exit(1); });
