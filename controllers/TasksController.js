const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);

     // if the request is expecting an ajax or json response
     if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }

  });
}


exports.done = (req, res) => {
  let task = {};
  task.id = (req.params.id);

  return Task.done(task.id)
  .then((task) => {
     // if the request is expecting an ajax or json response
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ id: task.id })
    } else {
      res.redirect('/');
    }
  })
}


exports.delete = (req, res) => {
  let task = {};
  task.id = (req.params.id);
  Task.delete(task.id)
  .then(() => {

     // if the request is expecting an ajax or json response
     if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      res.json({ id: task.id })
    } else {
      res.redirect('/');
    }

  });
}
