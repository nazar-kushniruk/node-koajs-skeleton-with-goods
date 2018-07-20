const memcash = require('../managers/memcachedManager.js');

module.exports = {

    async get(ctx) {
        try {
            const item = await memcash.getGoods(ctx.params.id);
            if (typeof item === 'string') {
                ctx.response.body = item;
                ctx.status = 200;
            } else {
                ctx.status = 404;
                ctx.response.body = {
                    message: 'Not found',
                };

            }

        } catch (error) {
            ctx.response.body = {
                message: error.message,
            };

            ctx.status = 404;
        }
    },



    async posto(ctx) {
        try {
            ctx.response.body = await memcash.addGoods(ctx.request.body);
            ctx.status = 201;
        } catch (error) {
            ctx.response.body = {
                message: error.message,
            };
            ctx.status = 400;
        }

    },

    async deleteGoods(ctx, next) {
        try {
            const item = await memcash.deleteGoods(ctx.params.id);
            if ( item === true) {

                ctx.status = 204;
            } else {
                ctx.response.body = {
                    message: 'Not found',
                };
                ctx.status = 400;
            }
            console.info('delete', JSON.stringify(ctx.params.id), JSON.stringify(item));
        } catch (error) {
            ctx.response.body = {
                message: error.message,
            };
            ctx.response.code = 400;
        }
    }
};