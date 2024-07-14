// const jsonServer = require('newzero/node_modules/json-server');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 커스텀 응답 미들웨어
server.post('/users', (req, res) => {
    const users = router.db.get('users');
    const newUser = {
        id: req.body.id,
        pw: req.body.pw,
        email: req.body.email,
        name: req.body.name
    };

    // 유저 추가
    users.push(newUser).write();

    // 커스텀 응답
    res.status(200).json({ code: '0000' });
});

// 나머지 라우트
server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running');
});
