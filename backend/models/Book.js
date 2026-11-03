const mongoose = require('mongoose');

// Book Schema — the "Great Readings" shelf (aligned with the OSSU
// computer-science repo's extras/readings.md plus the in-app PDF library).
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authors: String,
  url: String, // external link (publisher / free online edition)
  localSrc: String, // in-app asset path, e.g. /books/thinkpython2.pdf
  category: {
    type: String,
    default: 'Programming'
  },
  note: String,
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

BookSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Book', BookSchema);
