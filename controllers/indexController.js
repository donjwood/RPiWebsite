
//Home page of the site.
exports.index = function (req, res, next) {
    res.render('pages/index', { 
        title: 'Raspberry Pi Galileo',
        session: req.session,
        raspberryPiName: 'Galileo'
    });
};