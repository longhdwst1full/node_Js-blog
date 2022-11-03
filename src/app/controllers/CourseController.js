const Course = require('../model/Course');
const {  mongooseToObject } = require('../../ulti/mongoose');

class CourseController {
    // get : lấy /course/:slug
    show(req, res, next) {
        // res.send("course detaik")
        Course.findOne({ slug: req.params.slug })
        .then(course => 
            res.render('courses/show', { course: mongooseToObject(course) })
        )
            .catch(next)
    }
}

module.exports = new CourseController();