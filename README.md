# node-koajs-skeleton-with-goods

# ТЗ

- _используя_ скелетон проекта (https://github.com/ria-com/node-koajs-skeleton)
- _подключить_ модуль memcached (https://www.npmjs.com/package/memcached)
- и _реализовать_ в нем методы

```GET /goods/:id```

,

```POST /goods```

и

```DELETE /goods/:id```

- метод GET должен по указанному идентификатору возвращать в теле ответа строку, которая была ранее записана в memcached при помощи метода POST
- метод GET в случае удачного завершения операции должен вернуть статус *200*
- метод GET в случае, если в memcached не найдены данные по указанному идентификатору должен вернуть статус *404*
- метод POST должен принимать данные в виде строки в теле запроса, добавлять их в memcached и и возвращать в теле ответа идентификатор
- метод POST должен возвращать 201-й статус в случае успешного выполнения операции
- метод POST должен возвращать 400-й статус в случае ошибки
- метод DELETE должен удалять по указанному идентификатору данные из memcached
- метод DELETE должен возвращать 204-й статус в случае успешного выполнения операции
- метод DELETE должен возвращать 400-й статус в случае ошибки (мало ли что)
- данные в теле запроса/ответа не надо сериализировать/десереализировать - т.е. если я передал в методе POST в теле "hello", то в ответе на запрос методом GET я должен получить эту же строку