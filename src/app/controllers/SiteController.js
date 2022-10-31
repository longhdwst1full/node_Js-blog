const Course = require("../model/Course");

class SiteController {


    // [get]  /
    index(req, res) {

        // res.render('home');
        Course.find({}, function (err, course) {
            if (!err) {
                res.json(course);

            }
            else {

                res.status(404).json({ error: "errorr!!" });
            }
        })
    }
    // [get] /search/
    // định nghĩa param tuyến đường
    search(req, res) {
        res.render('search');
    }
}
module.exports = new SiteController;