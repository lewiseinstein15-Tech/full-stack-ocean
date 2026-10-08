#!/usr/bin/env python3
"""Frontend patches for the full curriculum + Library release.

Run on VM inside ~/full-stack-ocean.
1. App.js      -> Library route
2. Layout.js   -> Library nav item + page title
3. Study.js    -> official-hub fallback card for lessons without embedded material
4. Courses.js  -> 8-term copy + term badges
5. CourseDetail.js -> official course hub section
"""
import sys

def patch(path, edits, label):
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    changed = False
    for old, new in edits:
        if new in src and old not in src:
            print(f"[{label}] already patched: {old[:40]!r}")
            continue
        if old not in src:
            print(f"[{label}] FATAL anchor missing: {old[:60]!r}")
            sys.exit(1)
        src = src.replace(old, new, 1)
        changed = True
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
    print(f"[{label}] ok")


# 1. App.js
patch("frontend/src/App.js", [
    ("import CourseDetail from 'pages/CourseDetail';",
     "import CourseDetail from 'pages/CourseDetail';\nimport Library from 'pages/Library';"),
    ('          <Route path="/practice" element={<Practice />} />',
     '          <Route path="/practice" element={<Practice />} />\n          <Route path="/library" element={<Library />} />'),
], "app")

# 2. Layout.js
patch("frontend/src/components/layout/Layout.js", [
    ("      { to: '/practice', icon: FiEdit3, label: 'Practice' },",
     "      { to: '/practice', icon: FiEdit3, label: 'Practice' },\n      { to: '/library', icon: FiBookOpen, label: 'Library' },"),
    ("  '/practice': 'Practice',",
     "  '/practice': 'Practice',\n  '/library': 'Library',"),
], "layout")

# 3. Study.js — hub fallback for future-term lessons
HUB_CARD = """      {!mats.videoId && !mats.slidesUrl && !mats.transcriptUrl && !mats.practicePdfUrl && !mats.practiceZipUrl && (
        <motion.div
          className="glass-strong rounded-[1.75rem] p-7 sm:p-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        >
          <h3 className="font-display text-xl font-bold text-espresso-800 mb-2">
            This unit opens on the official course hub
          </h3>
          <p className="text-espresso-600 text-sm max-w-xl mx-auto mb-5">
            Embedded video and PDF material is fully wired for Term 1 right now. Later terms point
            to the official course pages — watch and read there, then come back and mark the lesson
            complete to keep your streak.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {mats.externalUrl && (
              <a href={mats.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2 !px-5 text-xs">
                <FiExternalLink className="w-3.5 h-3.5" /> Open video hub
              </a>
            )}
            {mats.readingUrl && (
              <a href={mats.readingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-cream !py-2 !px-5 text-xs">
                <FiBookOpen className="w-3.5 h-3.5" /> Textbook / notes
              </a>
            )}
          </div>
        </motion.div>
      )}

"""
patch("frontend/src/pages/Study.js", [
    ("      {/* ---------- Video ---------- */}",
     HUB_CARD + "      {/* ---------- Video ---------- */}"),
], "study")

# 4. Courses.js
patch("frontend/src/pages/Courses.js", [
    ("Term 1 · 7 weeks · Oct 2026 →", "8 terms · 24 courses · from Oct 8, 2026"),
    ("""            Three MIT OpenCourseWare courses, scheduled week by week with videos, slides,
            transcripts and problem sets embedded right in the app.""",
     """            Twenty-four courses across eight terms — the complete path from foundations to
            capstone, two lessons every day, dated from your real start."""),
    ("""                    <span className="status-badge status-completed">
                      <FiPlay className="w-3 h-3" /> Active
                    </span>""",
     """                    <span className="status-badge">{c.term}</span>"""),
], "courses")

# 5. CourseDetail.js — official hub section + icon import
RESOURCES_CARD = """                {(course.resources?.lectures?.length > 0 || course.resources?.assignments?.length > 0 || course.resources?.exams?.length > 0) && (
                  <div className="glass rounded-3xl p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold text-espresso-800 mb-4 flex items-center gap-2">
                      <FiLayers className="w-5 h-5 text-honey-600" />
                      Official course hub
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {course.resources.lectures?.map((r, i) => (
                        <a key={`lec${i}`} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2 !px-4 text-xs">
                          <FiExternalLink className="w-3.5 h-3.5" /> {r.title || 'Video hub'}
                        </a>
                      ))}
                      {course.resources.assignments?.map((r, i) => (
                        <a key={`asg${i}`} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-cream !py-2 !px-4 text-xs">
                          <FiTarget className="w-3.5 h-3.5" /> {r.title || 'Practice archive'}
                        </a>
                      ))}
                      {course.resources.exams?.map((r, i) => (
                        <a key={`exm${i}`} href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-cream !py-2 !px-4 text-xs">
                          <FiBookOpen className="w-3.5 h-3.5" /> {r.title || 'Textbook / notes'}
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-espresso-500 mt-3">
                      This course's lectures and exercises live on the official hub — open these
                      whenever a unit points to the source material.
                    </p>
                  </div>
                )}

"""
patch("frontend/src/pages/CourseDetail.js", [
    ("  FiChevronRight, FiFileText, FiPackage, FiLayers, FiCalendar, FiTarget,",
     "  FiChevronRight, FiFileText, FiPackage, FiLayers, FiCalendar, FiTarget, FiExternalLink,"),
    ("                <div className=\"grid grid-cols-1 sm:grid-cols-3 gap-4\">",
     RESOURCES_CARD + "                <div className=\"grid grid-cols-1 sm:grid-cols-3 gap-4\">"),
], "coursedetail")

print("ALL FRONTEND PATCHES DONE")
