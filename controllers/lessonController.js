const Lesson = require("../models/Lesson");
const UserLesson = require('../models/relation/UserLesson');
const jwt = require('jsonwebtoken');


const getAllLessons = async (req, res) => {
  const lessons = await Lesson.findAll();
  if (!lessons) return res.status(204).json({ message: "No lessons found." });
  res.json(lessons);
};


  const getUserLessons = async (req, res) => {
    try {
      const userId = req.params.id; // Access the ID from the URL
      // Rest of your code
      const userLessons = await UserLesson.findAll({where: {userId : userId}})
      
      res.status(200).json({ userLessons });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



/*
Seul le professeur peut créer la leçon. 

- Leçon relié à l'emploi du temps du professeur : ok -
- Faire un GET avec les leçons appertenant à l'utilisateur -
- Ajouter les leçon sur la table de liaison lesson_user

*/
const createNewLesson = async (req, res) => {
  if (!req?.body?.instrument) {
    return res
      .status(400)
      .json({ message: "Veuillez donner un nombre d'heure ou un instrument." });
  }
  
  const token = req.headers.authorization?.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

 

  try {
    const lesson = await Lesson.create(
      {
        // numberOfHours: req.body.numberOfHours,
        instrument: req.body.instrument,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    );
    // Remplacer par UserLesson ?
    // const timetable = await Timetable.findOne({ where: { userId: decodedToken.UserInfo.id } });
    // const timetableLessonRelation = await TimetableLesson.create({ LessonID: lesson.id, TimetableID: timetable.id });
    // await timetableLessonRelation.save();
    console.log('req.body.id', req.body.id)
    console.log('lesson id ', lesson.id)

    const userlesson = await UserLesson.create({ userId: req.body.id, lessonId: lesson.id });
    await userlesson.save();
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

  if (req.body?.endDate) lesson.endDate = req.body.endDate;
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

// const getLesson = async (req, res) => {
//   if (!req?.params?.id)
//     return res.status(400).json({ message: `lesson ID is required` });

//   const lesson = await Lesson.findOne({ where: { id: req.params.id }});

//   if (!lesson) {
//     return res
//       .status(204)
//       .json({ message: `lesson ID ${req.body.id} not found` });
//   }
//   res.json(lesson);
// };

module.exports = {
  getAllLessons,
  createNewLesson,
  updateLesson,
  deleteLesson,
  getUserLessons,
};
