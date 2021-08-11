module.exports.getError = (req, res, next) => {
    res.status(404);
    res.render('./error/404', { title: "Page not found" })
    // res.sendFile(path.join(__dirname, 'views', '404.html'));
}