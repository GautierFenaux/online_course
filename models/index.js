const User = require('../models/User');
const Timetable = require('../models/Timetable');
const Lesson = require('./Lesson');
const TimetableLesson = require('../models/relation/TimetableLessons');
const Instrument = require('../models/Instrument');
const Style = require('../models/Style');
const UserLesson = require('../models/relation/UserLessons');



// Timetable.belongsToMany(Lesson, { through: 'Timetable_Lesson' });
// Lesson.belongsToMany(Timetable, { through: 'Timetable_Lesson' });

// Revoir cette association pour la faire comme celles d'en dessous.
Lesson.hasMany(TimetableLesson);
TimetableLesson.belongsTo(Lesson);

Timetable.hasMany(TimetableLesson);
TimetableLesson.belongsTo(Timetable);




// Style junction
// User.belongsToMany(Style, { through: 'user_style'});
// Style.belongsToMany(User, { through: 'user_style' });

User.belongsToMany(Lesson, { through: 'user_Lesson' });
Lesson.belongsToMany(User, { through: 'user_lesson' });



// Instrument junction
User.belongsToMany(Instrument, { through: 'user_instrument'});
Instrument.belongsToMany(User, { through: 'user_instrument' });