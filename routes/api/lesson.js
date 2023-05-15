const express = require ('express');
const router = express.Router();
const data = {};
const lessonController = require('../../controllers/lessonController');
const verifyRoles = require('../../middleware/verifyRoles'); 


router.route('/')
    .get(lessonController.getAllLessons)
    .post(verifyRoles('Teacher'), lessonController.createNewLesson)
    .put(verifyRoles('Teacher'), lessonController.updateLesson)
    .delete(verifyRoles('Teacher'), lessonController.deleteLesson);

router.route('/:id')
    .get(lessonController.getLesson);


module.exports = router;