const Lesson = require("../models/Lesson");
const Timetable = require("../models/Timetable");
const TimetableLesson = require('../models/relation/TimetableLessons');
const UserLesson = require('../models/relation/UserLessons');
const User = require('../models/User');
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
  // console.log(req)
  if (!req?.body?.instrument) {
    return res
      .status(400)
      .json({ message: "Veuillez donner un instrument." });
  }

  const token = req.headers.authorization?.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


  try {
    const lesson = await Lesson.create(
      {
        // numberOfHours: req.body.numberOfHours,
        instrument: req.body.instrument,
        topic: req.body.topic,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    );
    
    // const timetable = await Timetable.findOne({ where: { userId: decodedToken.UserInfo.id } });
    // console.log(lesson.id, timetable.id)
    // const timetableLessonRelation = await TimetableLesson.create({ lessonId: lesson.id, timetableId: timetable.id });
    // await timetableLessonRelation.save();
    
    const user = await User.findOne({ where: { id : decodedToken.UserInfo.id } });
    const userLessonRelation = await UserLesson.create({ lessonId: lesson.id, userId: user.id });
    await userLessonRelation.save();


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

const getUserLessons = async (req, res) => {

  /* 
  Récupérer l'emploi du temps et aller chercher les leçons via la table timetable_lesson ou via user_lesson ?
  
  How to fetch data from relation table with express
  
  */
  console.log('getUserLessons activé');
  console.log(req.params.userId);
  if (!req?.params?.userId)
    return res.status(400).json({ message: `lesson ID is required` });

  const userLessons = await UserLesson.findAll({ where: { userId: req.params.userId }, include: Lesson});
  console.log({userLessons})
  if (!userLessons) {
    return res
      .status(204)
      .json({ message: `Vous n'avez aucune leçon de prévu` });
  }
  res.json(userLessons);
};

module.exports = {
  getAllLessons,
  createNewLesson,
  updateLesson,
  deleteLesson,
  getUserLessons,
};
