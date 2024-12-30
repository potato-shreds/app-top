const Koa = require('koa');
const cors = require('@koa/cors');
const router = require('./router/router.js');
const { initData } = require('./appTopData/data.js');

const app = new Koa();
app.use(cors());

app.use(router.routes()).use(router.allowedMethods());

const PORT = 8080;

initData();
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
