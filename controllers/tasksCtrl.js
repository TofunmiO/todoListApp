const { json } = require('express');
const Task = require('../models/task.js');


// view all tasks+ jasmine and protractor; selenium and web driver. postman deals with router only n body if necessary. manage a session for the use. short id to controller and translate to long id when needed

exports.getAll = (req, res) => {

  Task.find()
  .then(data=> {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({message: "Tasks could not be found"});
  });

  
};
// add and Save a new task
exports.addTask = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
    // Create a Task
  const task = new Task({
    content: req.body.content,
    dateCompleted: req.body.dateCompleted ? req.body.dateCompleted :undefined,
    deadline: req.body.deadline ? req.body.deadline : undefined
  });
   // Save Task in the database
  task
    .save(task)
    .then(data => {
      res.send(data);
      console.log("Data saved")
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Task."
      });
    });
};

// mark a task as complete.
exports.mark= (req, res) => {
  //    if (!req.body.content) {
  //   return res.status(400).send({
  //     message: "Data to mark can not be empty!"
  //   });
  // }
  const id = req.params.id;

  Task.findOneAndUpdate(id, { //PATCH => dateCompleted for a given todo task => dateCompleted for a given match or id 
  //findByIdandUpdate or findOneAndUpdate -> dateCompleted: Date.now()
    //  { useFindAndModify: false }
    dateCompleted: req.body.dateCompleted
  }, {new: true}
    )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot mark Task with id=${id}. Maybe Task was not found!`
        });
      } else {
        req.body.dateCompleted = Date.now() 
        res.send({
          message: "Task was marked successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not mark Task with id=" + id
      });
    });

};

// unmark a task 
exports.unmark = (req, res) => {
  //    if (!req.body.content) {
  //   return res.status(400).send({
  //     message: "Data to unmark can not be empty!"
  //   });
  // }
  const id = req.params.id;

  Task.findOneAndUpdate(id, {
    //  { useFindAndModify: false }
    dateCompleted: req.body.dateCompleted
  }, {new: true}
    )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot unmark Task with id=${id}. Maybe Task was not found!`
        });
      } else {
        req.body.dateCompleted = undefined
        res.send({
          message: "Task was unmarked successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not mark Task with id=" + id
      });
    });


};

// Update a task identified by the taskId in the request
exports.updateBody = (req, res) => {
     if (!req.body.content) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Task.findByIdAndUpdate(id, {
    //  { useFindAndModify: false }
    content: req.body.content
  }, {new: true}
    )
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`
        });
      } else{ 
        res.send({ message: "Task was updated successfully." });
        // res.send(note)
      }
    })
    .catch(err => {
      if (err.kind === 'ObjectId'){
        return res.status(404).send({
          message:'Note not found '+ id
        });
      }
      return res.status(500).send({
        message: "Error updating Task with id=" + id
      });
    });
};


// Update a task deadline identified by the taskId in the request ***data=deadline??
exports.updateDeadline = (req, res) => {
     if (!req.body.content) {
        return res.status(400).send({
        message: "Deadline to update can not be empty!"
    });
  }

  const id = req.params.id;
  Task.findByIdAndUpdate(id, {
    //  { useFindAndModify: false }
    deadline: req.body.deadline
  }, {new: true}
    )
    .then(deadline => {
      if (!deadline) {
        res.status(404).send({
          message: `Cannot update Task deadline with id=${id}. Maybe Task deadline was not found!`
        });
      } else {
        res.send({ message: "Task deadline was updated successfully." });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Task deadline with id=" + id
      });
    });
};

// exports.updateDeadline = (req,res) => {

//   Tasks.findByIdAndUpdate(id)
//     .then(console.log("Updated deadline"))
//     .catch(err => {console.log(`Got an error => ${err}`)})
// }
// Delete a task with the specified taskId in the request
exports.deleteTask = (req, res) => {
  // const id = req.params.id;

  Task.findOneAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${req.params.id}. Maybe Task was not found!`
        });
      } else {
        res.send({
          message: "Task was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });

};

// Delete a task deadline with the specified taskId in the request ***
exports.deleteDeadline = (req, res) => {
  const id = req.params.id;
  Task.findOneAndDelete
  //findByIdAndRemove
  (id, {
    //  { useFindAndModify: false }
    deadline: req.body.deadline
  }
    )
    .then(deadline => {
      if (!deadline) {
        res.status(404).send({
          message: `Cannot delete Task deadline with id=${id}. Maybe Task deadline was not found!`
        });
      } else {
        res.send({
          message: "Task deadline was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task deadline with id=" + id
      });
    });

};