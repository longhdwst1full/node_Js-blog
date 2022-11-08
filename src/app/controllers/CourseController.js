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
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);

        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => {
                next(err)
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

    // delete cỏurse id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next(err))
    }
    // patch : restore cỏurse id
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next(err))
    }
    // delete cỏurse id
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(err => next(err))
    }

    // handle form submit action: post
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({
                    message: "Action k hợp lệ"
                })
        }
    }
}
module.exports = new CourseController();