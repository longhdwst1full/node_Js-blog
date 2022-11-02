const Course = require("../model/Course");
const {mutipleMongooseToObject} = require("../../ulti/mongoose")
class SiteController {


    // [get]  /
    // index(req, res) {

    //     // res.render('home');
    //     Course.find({}, function (err, course) {
    //         if (!err) {
    //             res.json(course);

    //         }
    //         else {

    //             res.status(404).json({ error: "errorr!!" });
    //         }
    //     })
    // }
    index(req, res, next) {
        Course.find({})
            .then(courses => {  
                res.render('home', {
                    courses : mutipleMongooseToObject(courses)
                })
            })
            .catch(err => next(err))
    }
    // [get] /search/
    // định nghĩa param tuyến đường
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController;