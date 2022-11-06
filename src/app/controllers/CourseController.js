const Course = require('../model/Course');
const { mongooseToObject } = require('../../ulti/mongoose');

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
    //    method get gửi yêu cầu lấy về form tạo 
    create(req, res, next) {
        res.render('courses/create');
    }
    // method post gửi dữ liệu lên server
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);

        course.save()
            .then(() => res.redirect('/'))
            .catch(err => {

            })
    }

    // method post gửi dữ liệu lên server
    // edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(err => next(err))
    }
    // update course/id :put 
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => next(err))
    }
}

module.exports = new CourseController();