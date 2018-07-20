//(function () {
    "use strict";
    const Memcached = require('memcached'),
        memcached = new Memcached('127.0.0.1:11211');
   // console.log('memcached -- vi',memcached);
    const uuid = require('uuid');
    const {promisify} = require('util');

    module.exports = {
        async addGoods(name) {
            const key = uuid.v4();
            console.info('add', key, JSON.stringify(name));
            await promisify(memcached.set.bind(memcached))(key, name, 24 * 3600);
/*
            await new Promise((resolve, reject) => {
                memcached.set(key, name, 24 * 36000, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
*/
            console.info('add OK', key, JSON.stringify(name));
            return key;
        },
        getGoods(key) {
            return promisify(memcached.get.bind(memcached))(key);
        /*    new Promise((resolve, reject) => {
                memcached.get(key,(error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });*/
        },
        deleteGoods(key){
            return promisify(memcached.del.bind(memcached))(key);
        }
    };
//})
