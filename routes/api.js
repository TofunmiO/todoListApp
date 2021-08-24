const express = require("express");
const tasks = require("../controllers/tasksCtrl")

// let bodyParser = require("body-parser"); bc express cann do the work
let router = express.Router();

router.use(function(req,res,next){
    console.log(`Request containing received @ ${Date.now()}`);
    next();    
});

router.use(express.urlencoded({extended: true }))
router.use(express.json())


// .get((req,res) => {
//     res.send("Hello from API");
// });

// router.get('/:name', (req,res) => {
//     res.send(`Welcome to the API ${req.params.name}`);
// });

// router.get('/', (req,res) => { tasks.getAll;

//     res.send(`Welcome to To-do-list application ${req.query.name}`);
// })
// router.get('/v1', (req,res) => {
//     res.send("Accessing API version v1");
// });

// router.post('/:tasks', (req,res) => {
//     res.send("test createRo");
// });

// router.listen(8000, () => {
//     console.log("Server listening on port 8000");
// });

// get all tasks
router.get('/', tasks.getAll);

// Create a new task

router.post('/', tasks.addTask);

// router.post('/', tasks.addDeadline);

// mark a single task with taskId 
router.patch('/:Id', tasks.mark);

// unmark a single task with taskId . unable
router.patch('/:Id', tasks.unmark); 

// Update a task with taskId unable
router.patch('/:Id', tasks.updateBody); 

// Update a task deadline with taskId unable
router.patch('/:Id', tasks.updateDeadline);

// Delete a task with taskId
router.delete('/:Id', tasks.deleteTask);

//unable
router.delete('/:Id', tasks.deleteDeadline);

module.exports = router;