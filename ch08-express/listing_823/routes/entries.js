const Entry = require('../models/entry');
exports.list = (req, res, next) => {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err);
    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

exports.submit = (req, res, next) => {
  const data = req.body.entry;
  const entry = new Entry({
    username: res.locals.user.name,
    title: data.title,
    body: data.body
  });
  entry.save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

exports.form = (req, res) => {
  res.render('post', { title: 'Post' });
};
