const Lesson = require("../models/Lesson");
const Timetable = require("../models/Timetable");
const TimetableLesson = require('../models/relation/TimetableLessons');
const jwt = require('jsonwebtoken');


const getAllLessons = async (req, res) => {
  const lessons = await Lesson.findAll();
  if (!lessons) return res.status(204).json({ message: "No lessons found." });
  res.json(lessons);
};

/*
Seul le professeur peut créer la leçon. 

- Leçon relié à l'emploi du temps du professeur : ok -
*/
const createNewLesson = async (req, res) => {
  if (!req?.body?.numberOfHours || !req?.body?.instrument) {
    return res
      .status(400)
      .json({ message: "Veuillez donner un nombre d'heure ou un instrument." });
  }

  const token = req.headers.authorization?.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 

  try {
    const lesson = await Lesson.create(
      {
        numberOfHours: req.body.numberOfHours,
        instrument: req.body.instrument,
        date: req.body.date,
      },
    );
    const timetable = await Timetable.findOne({ where: { userId: decodedToken.UserInfo.id } });
    const timetableLessonRelation = await TimetableLesson.create({ LessonID: lesson.id, TimetableID: timetable.id });
    await timetableLessonRelation.save();
    res.status(201).json(lesson);
  } catch (err) {
    console.log(err);
  }
};

const updateLesson = async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: `lesson ID ${req.body.id} not found` });
  }

  const lesson = await Lesson.findOne({ _id: req.body.id });

  if (!lesson) {
    return res
      .status(204)
      .json({ message: `No lesson matches ID : ${req.body.id} ` });
  }

  if (req.body?.firstname) lesson.firstname = req.body.firstname;
  if (req.body?.lastname) lesson.lastname = req.body.lastname;
  const result = await lesson.save();
  res.json(result);
};

const deleteLesson = async (req, res) => {
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: `lesson ID ${req.body.id} not found` });
  }
  const lesson = await Lesson.findOne({ where: { id: req.body.id } });

  if (!lesson) {
    return res
      .status(400)
      .json({ message: `lesson ID ${req.body.id} not found` });
  }
  const result = await lesson.destroy();

  res.json(result);
};

const getLesson = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: `lesson ID is required` });

  const lesson = await Lesson.findOne({ where: { id: req.params.id }});

  if (!lesson) {
    return res
      .status(204)
      .json({ message: `lesson ID ${req.body.id} not found` });
  }
  res.json(lesson);
};

module.exports = {
  getAllLessons,
  createNewLesson,
  updateLesson,
  deleteLesson,
  getLesson,
};
