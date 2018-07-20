/**
 * Main route rules
 * @param {koa} app - Koa appliacation
 * @param {helpers/passport} passport - Adapted passport module
 * @module routes
 */
module.exports = function routes(app, passport) {
    "use strict";

    const
        co   = require('co'),
        Router = require('koa-router'),
        authed = require('../helpers/authedMiddleware'),
        Boom = require('boom'),
        // usersModel = require('./models/users');







    // Controllers
        indexController  = require('../controllers/indexController'),
        loginController  = require('../controllers/loginController'),
        secureController = require('../controllers/secureController'),
        goodsController = require('../controllers/goodsController');
    var router = new Router();
    var goodsRouter = new Router();

    router
        .get('/',          indexController.index)
        .get('/users',     indexController.list)
        .get('/users/:id', indexController.getId)
        .get('/login',     loginController.login)
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/secure',
                failureRedirect: '/login'
            })
        )
        .get('/logout', co.wrap(function*(ctx) {
            ctx.logout();
            ctx.redirect('/login')
        }))
        .get('/secure', authed, secureController.index);

    goodsRouter
        .get('/goods/:id', goodsController.get)/** 200 - vse ok, 404 - нет  такого товара */
        .post('/goods', goodsController.posto)/** 201 - yдалось добавить товар , 400 - не удалось */
        .del('/goods/:id', goodsController.deleteGoods)/** 204 - удалось удалить, 400 - не удалось */

    app.use(router.routes());
    app.use(goodsRouter.routes());
    app.use(router.allowedMethods({
        throw: true,
        notImplemented: () => new Boom.notImplemented(),
        methodNotAllowed: () => new Boom.methodNotAllowed()
    }));
    app.use(goodsRouter.allowedMethods({
        throw: true,
        notImplemented: () => new Boom.notImplemented(),
        methodNotAllowed: () => new Boom.methodNotAllowed()
    }));
};