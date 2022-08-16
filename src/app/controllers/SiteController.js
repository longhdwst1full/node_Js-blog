
class SiteController {


    // [get]  /
    index(req, res) {
        res.render('home');
    }
    // [get] /search/
    // định nghĩa param tuyến đường
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController;