const Course = require('../model/Course');
const { mongooseToObject, mutipleMongooseToObject } = require('../../ulti/mongoose');

class CourseController {
    ///stored/courses', meController.storedCourses
    storedCourses(req, res, next) {
            let courseQuery= Course.find({});

            if(req.query.hasOwnProperty('_sort')){
                courseQuery= courseQuery.sort({
                    [req.query.column] : req.query.type
                })
            }


        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => res.render('me/stored-courses', {
                deletedCount,
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(next)

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next);

        // promise.all thay thế cho 2 cái .find và .countDocument..
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