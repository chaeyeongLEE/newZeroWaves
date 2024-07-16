const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/status', (req, res) => {
    res.json({ status: 'API is running' });
});

// Handle POST requests to /favorites
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.id = Math.random().toString(36).substr(2, 9);
        req.body.desc = '';
        req.body.phone = req.body.phone || '';
    }
    next();
});

// Use default router
server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running on port 3001');
});
