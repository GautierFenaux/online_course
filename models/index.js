const Timetable = require('../models/Timetable');
const Lesson = require('./Lesson');
const TimetableLesson = require('../models/relation/TimetableLessons');




// Timetable.belongsToMany(Lesson, { through: 'Timetable_Lesson' });
// Lesson.belongsToMany(Timetable, { through: 'Timetable_Lesson' });

Lesson.hasMany(TimetableLesson);
TimetableLesson.belongsTo(Lesson);

// Also setup a One-to-Many relationship between Profile and Grant
Timetable.hasMany(TimetableLesson);
TimetableLesson.belongsTo(Timetable);