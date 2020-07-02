module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/park', require('./park.routes.js'))
    app.use('/coaster', require('./coaster.routes.js'))
}