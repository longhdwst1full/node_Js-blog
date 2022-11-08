const Course = require('../model/Course');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');

class CourseController {
    ///stored/courses', meController.storedCourses
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => res.render('me/stored-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }

    // trash : thùng rác

    // get me/trash/course
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }


}

module.exports = new CourseController();