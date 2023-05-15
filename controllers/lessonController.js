const Lesson = require ('../models/Lesson');

const getAllLessons = async (req, res) => {
  const lessons = await Lesson.find();
  if(!lessons) return res.status(204).json({'message': 'No lessons found.'});
  res.json(lessons)
};

// Relier la leçon à l'emploi du temps
const createNewLesson = async (req, res) => {
   if(!req?.body?.numberOfHours || !req?.body?.instrument) {
    return res.status(400).json({'message': 'Veuillez donner un nombre d\'heure ou un instrument.' });
   }
   
   try {
    const result = await Lesson.create({
        numberOfHours: req.body.numberOfHours,
        instrument: req.body.instrument,
        date: req.body.date
    });
    res.status(201).json(result);
   } catch (err) {
    console.log(err)
   }
};

const updateLesson = async (req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ "message": `lesson ID ${req.body.id} not found` });
    }    

    const lesson = await Lesson.findOne({ _id: req.body.id});

    if (!lesson) {
        return res.status(204).json({ "message": `No lesson matches ID : ${req.body.id} ` });
    }

    if (req.body?.firstname) lesson.firstname = req.body.firstname;
    if (req.body?.lastname) lesson.lastname = req.body.lastname;
    const result = await lesson.save();
    res.json(result);
}

const deleteLesson = async(req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ "message": `lesson ID ${req.body.id} not found` });
    }
    const lesson = await Lesson.findOne({ _id: req.body.id }).exec();


    if (!lesson) {
        return res.status(400).json({ "message": `lesson ID ${req.body.id} not found` });
    }
    const result = await Lesson.deleteOne();


    res.json(lesson);
}


const getLesson = async (req, res) => {

    if(!req?.params?.id) return res.status(400).json({ "message": `lesson ID is required` });

    const lesson = await Lesson.findOne({ _id: req.params.id});

    if (!lesson) {
        return res.status(204).json({ "message": `lesson ID ${req.body.id} not found` });
    }
    res.json(lesson);
}

module.exports = {
    getAllLessons,
    createNewLesson,
    updateLesson,
    deleteLesson,
    getLesson
}