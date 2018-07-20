
    "use strict";
    const Memcached = require('memcached'),
        memcached = new Memcached('127.0.0.1:11211');

    const uuid = require('uuid');
    const {promisify} = require('util');

    module.exports = {
        async addGoods(name) {
            const key = uuid.v4();
            await promisify(memcached.set.bind(memcached))(key, name, 24 * 3600);
            return key;
        },
        getGoods(key) {
            return promisify(memcached.get.bind(memcached))(key);

        },
        deleteGoods(key){
            return promisify(memcached.del.bind(memcached))(key);
        }
    };

