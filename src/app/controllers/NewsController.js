
class NewsController {


    // [get]  /news
    index(req, res) {
        res.render('news');
    }
// [get] /news/:slug
// định nghĩa param tuyến đường
show(req, res) {
res.send('NEWS DETAIL !!!');
}
}

module.exports = new NewsController;