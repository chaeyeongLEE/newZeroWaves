const jsonServer = require('json-server')


const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users', (req, res) => {
    const users = router.db.get('users'); // Access 'users' collection from db.json
    const newUser = {
        id: req.body.id,
        pw: req.body.pw,
        email: req.body.email,
        name: req.body.name
    };

    users.push(newUser).write();

    res.status(200).json({ code: '0000' });
});

server.use(router);

server.listen(3002, () => {
    console.log('JSON Server is running');
});
